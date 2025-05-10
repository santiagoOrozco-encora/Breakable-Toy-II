package com.FlightSearch.BackEnd.service;


import com.FlightSearch.BackEnd.data.model.Address;
import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.AirlineInfo;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.DictionaryDTO;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.FlightDetails;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.FlightStops;
import com.FlightSearch.BackEnd.data.model.apiRespose.AirportResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.FlightOffer;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.Location;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.OfferDictionary;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.Price;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary.Itinerary;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary.Segment;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary.flightDetail;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing.TravelerPricings;
import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightOfferDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import com.FlightSearch.BackEnd.presentation.dto.OfferDTO;
import com.FlightSearch.BackEnd.service.ApiClient.FlightApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightApiService flightApiService;
    private final Map<String,AirportData> dataCache = new ConcurrentHashMap<>();

    @Autowired
    public FlightService(FlightApiService flightApiService) {
        this.flightApiService = flightApiService;
    }

    //Search airport matching keyword
    public List<AirportListDTO> searchAirport(String keyword) {
        AirportResponse apiResponse = flightApiService.airportSearch(keyword);
        if(apiResponse.getData() != null){
            return apiResponse.getData().stream()
                    .map(this::convertToAirportListDTO)
                    .toList();
        }

        return List.of();
    }

    //Conversion from Data to DTO
    private AirportListDTO convertToAirportListDTO(AirportData airportData){
        AirportListDTO dto = new AirportListDTO();
        Address airportAddress = airportData.getAddress();
        dto.setValue(airportData.getIataCode());
        dto.setLabel(String.format("%s (%s,%s)",airportData.getName(),airportAddress.getCountryName(),airportAddress.getCityName()));
        return dto;
    }

    //Search flight
    public OfferDTO searchFlight(FlightSearchDTO searchDetails){
        FlightResponse apiResponse = this.flightApiService.flightOfferSearch(searchDetails);
        OfferDictionary dictionary = apiResponse.getDictionaries();
        List<FlightOfferDTO> flightOffers = List.of();
        if(apiResponse.getData() != null){
            flightOffers = apiResponse.getData().stream()
                    .map(flightOffer -> convertToFlightOfferDTO(flightOffer,dictionary))
                    .toList();
        }
        return populateOfferDTO(flightOffers,dictionary);
    }

    //Convert Flight offer to DTO
    private FlightOfferDTO convertToFlightOfferDTO(FlightOffer flightOffer, OfferDictionary dictionary){
        Itinerary goingItinerary = flightOffer.getItineraries().getFirst();

        FlightDetails goingFlightDetails = getFlightDetails(goingItinerary,dictionary);
        Price offerPrice = flightOffer.getPrice();
        List<TravelerPricings> travelerPricings = flightOffer.getTravelerPricings();

//      If the flight offer is round-trip
        if(flightOffer.getItineraries().size() > 1){
            Itinerary comingItinerary = flightOffer.getItineraries().get(1);

            FlightDetails returningFlightDetails = getFlightDetails(comingItinerary,dictionary);

            return new FlightOfferDTO(
                            goingFlightDetails,
                            offerPrice,
                            travelerPricings,
                            returningFlightDetails
                    );

        }else{
            return new FlightOfferDTO(goingFlightDetails,offerPrice,travelerPricings);
        }
    }

    //Get trip details
    private FlightDetails getFlightDetails(Itinerary itinerary, OfferDictionary dictionary){

        Segment flightDetails = itinerary.getSegments().getFirst();

        // Origin information
        flightDetail departure = flightDetails.getDeparture();
        String initialDayTime = departure.getAt();
        String initialAirport = departure.getIataCode();

        // Airline information
        AirlineInfo airlineInfo = new AirlineInfo(dictionary.getCarriers().get(flightDetails.getCarrierCode()), flightDetails.getCarrierCode());

        // If the itinerary has not stops
        if(itinerary.getSegments().size() == 1){
            // Destination information
            flightDetail arrival = flightDetails.getArrival();
            String finalDayTime = arrival.getAt();
            String finalAirport = arrival.getIataCode();

            return new FlightDetails(
                            initialDayTime,
                            initialAirport,
                            finalDayTime,
                            finalAirport,
                            airlineInfo,
                            itinerary.getDuration()
                    );
        }else{

            List<FlightStops> flightStops = getFlightStops(itinerary.getSegments(),dictionary);

            // Destination information
            Segment finalSegment = itinerary.getSegments().getLast();
            flightDetail arrival = finalSegment.getArrival();
            String finalDayTime = arrival.getAt();
            String finalAirport = arrival.getIataCode();

            return  new FlightDetails(
                            initialDayTime,
                            initialAirport,
                            finalDayTime,
                            finalAirport,
                            airlineInfo,
                            itinerary.getDuration(),
                            flightStops
                    );
        }
    }

    //Get airport information filtering with IATA code
    private AirportData getAirportData(Location location, String iataCode) {
//        System.out.println("Cache info:"+ dataCache);
        if(dataCache.containsKey(iataCode)){
            System.out.println("From the cache");
            return dataCache.get(iataCode);
        }
        List<AirportData> airportData = flightApiService.airportSearch(location.getCityCode()).getData();
        return airportData.stream().filter(airportData1 -> airportData1.getIataCode().equals(iataCode)).findFirst().orElse(new AirportData(iataCode));
    }

    //Get list of all flight stops with details
    private List<FlightStops> getFlightStops(List<Segment> segmentList,OfferDictionary dictionary){
        return segmentList.stream()
                .skip(1)
                .limit(segmentList.size()-1)
                .map(segment -> {
                    int current = segmentList.indexOf(segment);
                    if(current>0){
                        Segment prevSeg = segmentList.get(current-1);
                        return convertToFlightStop(prevSeg.getArrival().getAt(),segment,dictionary);
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    //Convert flight segment to flight stop
    private FlightStops convertToFlightStop(String arrival,Segment segment,OfferDictionary dictionary){
        LocalDateTime arrivalTime = LocalDateTime.parse(arrival);
        LocalDateTime departureTime = LocalDateTime.parse(segment.getDeparture().getAt());
        Duration waitTime = Duration.between(arrivalTime,departureTime);

        long seconds = waitTime.getSeconds();
        long absSeconds = Math.abs(seconds);
        String waitTimeFormatted = String.format(
                "%d:%02d:%02d",
                absSeconds / 3600,
                (absSeconds % 3600) / 60,
                absSeconds % 60
        );

        AirlineInfo airlineInfo = new AirlineInfo(dictionary.getCarriers().get(segment.getCarrierCode()), segment.getCarrierCode());
        String airportCode = segment.getDeparture().getIataCode();

        return  new FlightStops(waitTimeFormatted,segment.getArrival().getAt(),segment.getDeparture().getAt(),airportCode,airlineInfo);
    }

    private OfferDTO populateOfferDTO(List<FlightOfferDTO> flightOfferDTOList, OfferDictionary offerDictionary) {
        Map<String,AirportData> airports = offerDictionary.getLocations().keySet().stream()
                .distinct()
                .collect(Collectors.toMap(
                        iataCode -> iataCode,
                        iataCode -> getAirportData(offerDictionary.getLocations().get(iataCode),iataCode)
                ));
        DictionaryDTO dictionaryDTO = new DictionaryDTO(
                airports,
                offerDictionary.getAircraft(),
                offerDictionary.getCurrencies(),
                offerDictionary.getCarriers()
        );
        return new OfferDTO(flightOfferDTOList,dictionaryDTO);
    }
}

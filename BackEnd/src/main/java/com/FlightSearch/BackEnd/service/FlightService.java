package com.FlightSearch.BackEnd.service;


import com.FlightSearch.BackEnd.data.model.Address;
import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.AirlineInfo;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.FlightDetails;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.FlightStops;
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
import com.FlightSearch.BackEnd.service.ApiClient.FlightApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightApiService flightApiService;

    @Autowired
    public FlightService(FlightApiService flightApiService) {
        this.flightApiService = flightApiService;

    }

    //Search airport matching keyword
    public Mono<List<AirportListDTO>> searchAirport(String keyword) {
        return this.flightApiService.airportSearch(keyword).map(airportResponse -> {
            if(airportResponse != null && airportResponse.getData() != null){
                return airportResponse.getData().stream()
                        .map(this::convertToAirportListDTO)
                        .collect(Collectors.toList());
            }
            return List.of();
        });

    }

    //Conversion from Data to DTO
    private AirportListDTO convertToAirportListDTO(AirportData airportData){
        AirportListDTO dto = new AirportListDTO();
        Address airportAddress = airportData.getAddress();
//        BeanUtils.copyProperties(airportData,dto);
        dto.setValue(airportData.getIataCode());
        dto.setLabel(String.format("%s (%s,%s)",airportData.getName(),airportAddress.getCountryName(),airportAddress.getCityName()));
        return dto;
    }

    //Search flight
    public Mono<List<FlightOfferDTO>> searchFlight(FlightSearchDTO searchDetails){
        return this.flightApiService.flightOfferSearch(searchDetails)
                .flatMap(flightResponse -> {
                    OfferDictionary dictionary = flightResponse.getDictionaries();

                    if(flightResponse.getData() != null){
                        return Flux.fromIterable(flightResponse.getData())
                                .map(flightOffer ->
                                    convertToFlightOfferDTO(flightOffer,dictionary))
                                .collectList();
            }
            return Mono.just(List.of());
        });
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

            return new FlightOfferDTO(goingFlightDetails,offerPrice,travelerPricings,returningFlightDetails);

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
        Mono<AirportData> initialAirportData = getAirportData(dictionary.getLocations().get(departure.getIataCode()),departure.getIataCode());

        // Airline information
        AirlineInfo airlineInfo = new AirlineInfo(dictionary.getCarriers().get(flightDetails.getCarrierCode()), flightDetails.getCarrierCode());

        // If the itinerary has not stops
        if(itinerary.getSegments().size() == 1){
            // Destination information
            flightDetail arrival = flightDetails.getArrival();
            String finalDayTime = arrival.getAt();
            Mono<AirportData> destinationAirportData = getAirportData(dictionary.getLocations().get(arrival.getIataCode()),arrival.getIataCode());

            return new FlightDetails(initialDayTime,initialAirportData,finalDayTime,destinationAirportData,airlineInfo, flightDetails.getDuration());
        }else{
            List<Segment> stopSegmentList = itinerary.getSegments().subList(0,itinerary.getSegments().size()-1);

            List<FlightStops> flightStops = getFlightStops(stopSegmentList,dictionary);

            // Destination information
            Segment finalSegment = itinerary.getSegments().getLast();
            flightDetail arrival = finalSegment.getArrival();
            String finalDayTime = arrival.getAt();

            Mono<AirportData> destinationAirportData = getAirportData(dictionary.getLocations().get(arrival.getIataCode()),arrival.getIataCode());

            return new FlightDetails(initialDayTime,initialAirportData,finalDayTime,destinationAirportData,airlineInfo, flightDetails.getDuration(),flightStops);

        }

    }

    //Get airport information filtering with IATA code
    private Mono<AirportData> getAirportData(Location location,String iataCode) {
        return this.flightApiService.airportSearch(location.getCityCode())
                .flatMap(airportResponse -> {
                    if (airportResponse != null && airportResponse.getData() != null) {
                        return airportResponse.getData().stream()
                                .filter(airportData -> airportData.getIataCode().equals(iataCode))
                                .findFirst()
                                .map(Mono::just) // Convert Optional to Mono
                                .orElse(Mono.empty());
                    }
                    return Mono.empty();
                })
                .map(airportData -> airportData);
    }

    //Get list of all flight stops with details
    private List<FlightStops> getFlightStops(List<Segment> segmentList,OfferDictionary dictionary){
        return segmentList.stream()
                .skip(1)
                .limit(segmentList.size()-1)
                .map(segment -> {
                    int currentIndex = segmentList.indexOf(segment);
                    if(currentIndex > 0){
                        Segment prevSegment = segmentList.get(currentIndex-1);
                        return convertToFlightStop(prevSegment.getDeparture().getAt(),segment,dictionary);
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
        Mono<AirportData> airportData = getAirportData(dictionary.getLocations().get(segment.getDeparture().getIataCode()),segment.getDeparture().getIataCode());

        return new FlightStops(waitTimeFormatted,airportData,airlineInfo);
    }

}

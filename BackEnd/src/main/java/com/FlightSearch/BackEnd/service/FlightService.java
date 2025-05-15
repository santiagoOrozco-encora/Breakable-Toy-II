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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class FlightService {


    private final FlightApiService flightApiService;
    private final FlightApiService NinjaApiService;
    private final Map<String,AirportData> dataCache = new ConcurrentHashMap<>();
    private OfferDTO offerCache = new OfferDTO();

    @Autowired
    public FlightService(
            @Qualifier("amadeousFlightApiServiceImpl")FlightApiService flightApiService,
            @Qualifier("ninjaServiceImp")FlightApiService flightApiService2)
    {
        this.flightApiService = flightApiService;
        this.NinjaApiService = flightApiService2;
    }

    //Search airport matching keyword
    public List<AirportListDTO> searchAirport(String keyword) {
        AirportResponse apiResponse = flightApiService.airportSearch(keyword);
        if(apiResponse.getData() != null && !apiResponse.getData().isEmpty()){
            return apiResponse.getData().stream()
                    .map(this::convertToAirportListDTO)
                    .toList();
        }
        AirportResponse backResponse = NinjaApiService.airportSearch(keyword);
        if(backResponse.getData() != null && !backResponse.getData().isEmpty()){
            System.out.println("using Ninja Api");
            return backResponse.getData().stream()
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
        System.out.println(dto);
        return dto;
    }

    //Search flight
    public OfferDTO searchFlight(FlightSearchDTO searchDetails){
        FlightResponse apiResponse = this.flightApiService.flightOfferSearch(searchDetails);
        System.out.println(apiResponse);
        OfferDictionary dictionary = apiResponse.getDictionaries();
        List<FlightOfferDTO> flightOffers = List.of();
        if(apiResponse.getData() != null){
            flightOffers = apiResponse.getData().stream()
                    .map(flightOffer -> convertToFlightOfferDTO(flightOffer,dictionary))
                    .toList();
        }


        offerCache = populateOfferDTO(flightOffers,dictionary);
        System.out.println(offerCache);
        return offerCache;
    }

    //Filter flight
    public OfferDTO filterFlights(String filter, String order){
        List<FlightOfferDTO> offers = offerCache.getOffers();
        List<FlightOfferDTO> flightOffers = new ArrayList<>(offers);
        System.out.println("Filtering results" + filter + order);
        switch (filter){
            case "price":
                Comparator<FlightOfferDTO> priceComparator = Comparator.comparing(offer -> Float.parseFloat(offer.getPrice().getGrandTotal()));
                if(order.equalsIgnoreCase("desc")){
                    flightOffers.sort(priceComparator.reversed());
                }else{
                    flightOffers.sort(priceComparator);
                    System.out.println("filtered by price");
                }
                break;
            case "date":
                Comparator<FlightOfferDTO> durationComparator = Comparator.comparing(offer -> {
                    String totalTime = offer.getGoingFlight().getTotalTime().substring(2);
                    System.out.println(offer.getGoingFlight().getTotalTime());
                    System.out.println(totalTime);
                    int indexOfH = totalTime.indexOf("H");
                    int indexOfM = totalTime.indexOf("M");

                    int hours = Integer.parseInt(totalTime.substring(0,indexOfH));
                    System.out.println(hours);
                    int minutes = Integer.parseInt(totalTime.substring(indexOfH+1,indexOfM));
                    System.out.println(minutes);
                    System.out.println((minutes + hours*60));
                    return  (minutes + (hours*60));
                });

                if(order.equalsIgnoreCase("desc")){
                    flightOffers.sort(durationComparator.reversed());
                }else{
                    flightOffers.sort(durationComparator);
                }
                break;
            default:
                flightOffers = offerCache.getOffers();
        }
        System.out.println(flightOffers);
        return new OfferDTO(flightOffers,offerCache.getDictionaryDTO());

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
        AirlineInfo airlineInfo = new AirlineInfo(dictionary.getCarriers().get(flightDetails.getCarrierCode()),
                flightDetails.getCarrierCode());

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
                    itinerary.getDuration(),
                    List.of(),
                    itinerary.getSegments().getFirst().getAircraft()
            );
        }
        else{

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

        List<AirportData> backUp = NinjaApiService.airportSearch(iataCode).getData();

        if(airportData.isEmpty() && !backUp.isEmpty()){
            AirportData res = backUp.stream().filter(airport -> airport.getIataCode().equals(iataCode)).findFirst().orElse(new AirportData(iataCode));
            dataCache.put(iataCode,res);
            return res;
        }

        AirportData result =  airportData.stream().filter(airportData1 -> airportData1.getIataCode().equals(iataCode)).findFirst().orElse(new AirportData(iataCode));
        dataCache.put(iataCode,result);
        return result;
    }

    //Get list of all flight stops with details
    private List<FlightStops> getFlightStops(List<Segment> segmentList,OfferDictionary dictionary){
        return segmentList.stream()
                .map(segment -> {
                    int current = segmentList.indexOf(segment);
                    if(current>0){
                        Segment prevSeg = segmentList.get(current-1);
                        return convertToFlightStop(prevSeg.getArrival().getAt(),segment,dictionary);
                    }else{
                        FlightStops res = new FlightStops(segment.getId(),segment.getArrival().getAt(),segment.getDeparture().getAt(),
                                new AirlineInfo(dictionary.getCarriers().get(segment.getCarrierCode()),segment.getCarrierCode()),
                                segment.getDeparture().getIataCode(),segment.getDeparture().getIataCode(),
                                segment.getArrival().getIataCode(),segment.getAircraft(),
                                segment.getDuration(),segment.getNumber(),
                                segment.getCarrierCode());
                        if(segment.getStops() != null){
                            res.setStops(segment.getStops());
                        }
                        return res;
                    }
                })
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

        FlightStops result =   new FlightStops(segment.getId(),segment.getArrival().getAt(),
                segment.getDeparture().getAt(),airlineInfo,airportCode,segment.getDeparture().getIataCode(),
                segment.getArrival().getIataCode(),segment.getAircraft(),segment.getDuration(),segment.getNumber(),
                segment.getCarrierCode());
        result.setWaitTime(waitTimeFormatted);
        if(segment.getStops() != null){
            result.setStops(segment.getStops());
        }
        return result;
    }

    private OfferDTO populateOfferDTO(List<FlightOfferDTO> flightOfferDTOList, OfferDictionary offerDictionary) {
        if(!flightOfferDTOList.isEmpty()) {
            Map<String, AirportData> airports = offerDictionary.getLocations().keySet().stream()
                    .distinct()
                    .collect(Collectors.toMap(
                            iataCode -> iataCode,
                            iataCode -> getAirportData(offerDictionary.getLocations().get(iataCode), iataCode)
                    ));
            DictionaryDTO dictionaryDTO = new DictionaryDTO(
                    airports,
                    offerDictionary.getAircraft(),
                    offerDictionary.getCurrencies(),
                    offerDictionary.getCarriers()
            );
            return new OfferDTO(flightOfferDTOList, dictionaryDTO);
        }
        return new OfferDTO();
    }
}

package com.FlightSearch.BackEnd.service;


import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.AirportResponse;
import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

//  @Qualifier("AmadeousFlightApiServiceImpl")
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

    //Process the data to a list of DTO
//    private List<AirportListDTO> processAirports(AirportResponse airportResponse){
//        if(airportResponse != null && airportResponse.getData() != null){
//            return airportResponse.getData().stream().map(this::convertToAirportListDTO).collect(Collectors.toList());
//        }
//        return List.of();
//    }


    //Conversion from Data to DTO
    private AirportListDTO convertToAirportListDTO(AirportData airportData){
        AirportListDTO dto = new AirportListDTO();
//        BeanUtils.copyProperties(airportData,dto);
        dto.setIATACode(airportData.getIataCode());
        dto.setAirportName(airportData.getName());
        dto.setAddress(airportData.getAddress());
        return dto;
    }

    //Search flight
    public int searchFlight(FlightSearchDTO searchDetails){
//        return amadeousClient.get().uri(uriBuilder -> uriBuilder.path("v2/shopping/flight-offers").
//                queryParam("originLocationCode",searchDetails.getOrigin()).
//                queryParam()))))
        return 0;
    }
}

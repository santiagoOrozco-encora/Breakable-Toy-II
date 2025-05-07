package com.FlightSearch.BackEnd.service;


import com.FlightSearch.BackEnd.data.model.Adress;
import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import com.FlightSearch.BackEnd.service.ApiClient.FlightApiService;
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

    //Conversion from Data to DTO
    private AirportListDTO convertToAirportListDTO(AirportData airportData){
        AirportListDTO dto = new AirportListDTO();
        Adress airportAddress = airportData.getAddress();
//        BeanUtils.copyProperties(airportData,dto);
        dto.setValue(airportData.getIataCode());
        dto.setLabel(String.format("%s (%s,%s)",airportData.getName(),airportAddress.getCountryName(),airportAddress.getCityName()));
        return dto;
    }

    //Search flight
    public Mono<FlightResponse> searchFlight(FlightSearchDTO searchDetails){
        return this.flightApiService.flightOfferSearch(searchDetails);
    }
}

package com.FlightSearch.BackEnd.service;

import com.FlightSearch.BackEnd.data.model.AirportResponse;
import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import reactor.core.publisher.Mono;

import java.util.List;

public interface FlightApiService {

    public Mono<AirportResponse> airportSearch(String keyword);

    public Mono<String> getAuth();

}

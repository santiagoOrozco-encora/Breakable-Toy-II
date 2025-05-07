package com.FlightSearch.BackEnd.service.ApiClient;

import com.FlightSearch.BackEnd.data.model.apiRespose.AirportResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import reactor.core.publisher.Mono;


public interface FlightApiService {

    public Mono<AirportResponse> airportSearch(String keyword);

    public Mono<FlightResponse> flightOfferSearch(FlightSearchDTO searchDetails);

    public Mono<String> getAuth();


}

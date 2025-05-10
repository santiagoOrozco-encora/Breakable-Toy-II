package com.FlightSearch.BackEnd.service.ApiClient;

import com.FlightSearch.BackEnd.data.model.apiRespose.AirportResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import reactor.core.publisher.Mono;


public interface FlightApiService {

    public AirportResponse airportSearch(String keyword);

    public FlightResponse flightOfferSearch(FlightSearchDTO searchDetails);

    public String getAuth();


}

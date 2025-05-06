package com.FlightSearch.BackEnd.service;


import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final WebClient amadeousClient;
    private String token = "kEcxOymyTnsZd5T32qjS6mv0CJhi";
    @Autowired
    public FlightService(WebClient.Builder webClientBuilder) {
        this.amadeousClient = webClientBuilder.baseUrl("https://test.api.amadeus.com").defaultHeader(HttpHeaders.AUTHORIZATION, String.format("Bearer %s",token)).build();
    }


    public Mono<Object> searchAirport(String keyword) {
        return amadeousClient.get().uri(uriBuilder -> uriBuilder.path("v1/reference-data/locations").queryParam("subType","AIRPORT").queryParam("keyword",keyword).queryParam("view","LIGHT").build()).accept(MediaType.APPLICATION_JSON).retrieve().bodyToMono(Object.class).map(this::processAirports);

    }

    private Object processAirports(Object airportsInfo){
        System.out.println(airportsInfo);
        return airportsInfo;
    }

    public int searchFlight(FlightSearchDTO searchDetails){
        return 0;
    }
}

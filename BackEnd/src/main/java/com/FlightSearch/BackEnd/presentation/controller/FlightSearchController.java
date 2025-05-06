package com.FlightSearch.BackEnd.presentation.controller;


import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import com.FlightSearch.BackEnd.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Mono;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("api/v1/flightSearch")
public class FlightSearchController {

    private final FlightService flightService;

    @Autowired
    public FlightSearchController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/search-airport")
    public ResponseEntity<Mono<Object>> getAirports(@RequestParam(required = true,defaultValue = "") String keyword) {
        return ResponseEntity.ok(this.flightService.searchAirport(keyword));
    }

    @PostMapping("/search")
    public int searchFlight(@RequestBody FlightSearchDTO searchDetails){
        String uri = "test.api.amadeus.com/v2/shopping/flight-offers";
        RestTemplate flightSearchClient = new RestTemplate();

        if(flightService.searchFlight(searchDetails) == 0){
            return 0;
        }else{
            return 1;
        }
    }
}

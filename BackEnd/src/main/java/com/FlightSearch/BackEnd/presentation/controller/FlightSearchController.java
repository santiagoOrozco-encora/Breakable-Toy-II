package com.FlightSearch.BackEnd.presentation.controller;


import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightOfferDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import com.FlightSearch.BackEnd.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Mono;

import java.util.Date;
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
    public ResponseEntity<Mono<List<AirportListDTO>>> getAirports(@RequestParam(required = true,defaultValue = "") String keyword) {
        return ResponseEntity.ok(this.flightService.searchAirport(keyword));
    }

    @GetMapping("/search-flight-offers")
    public ResponseEntity<Mono<List<FlightOfferDTO>>> searchFlight(
            @RequestParam(defaultValue = "") String passengers,
            @RequestParam(defaultValue = "") String departureDate,
            @RequestParam(defaultValue = "") String returnDate,
            @RequestParam(defaultValue = "") String origin,
            @RequestParam(defaultValue = "") String destination,
            @RequestParam(defaultValue = "") Boolean nonStop,
            @RequestParam(defaultValue = "")String currency)
    {
        FlightSearchDTO dto = new FlightSearchDTO(passengers,departureDate,origin,destination,currency,nonStop);
        if(returnDate != null && !returnDate.isEmpty()){
            dto.setReturnDate(returnDate);
        }
        return ResponseEntity.ok(this.flightService.searchFlight(dto));
    }
}

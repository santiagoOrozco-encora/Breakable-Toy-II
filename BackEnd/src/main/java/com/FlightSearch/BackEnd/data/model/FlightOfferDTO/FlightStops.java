package com.FlightSearch.BackEnd.data.model.FlightOfferDTO;

import com.FlightSearch.BackEnd.data.model.AirportData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import reactor.core.publisher.Mono;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightStops {
    private String waitTime;
    private String arrivalTime;
    private String departureTime;
    private String airportData;
    private AirlineInfo airlineInfo;
}

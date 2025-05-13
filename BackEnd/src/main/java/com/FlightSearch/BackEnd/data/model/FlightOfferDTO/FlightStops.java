package com.FlightSearch.BackEnd.data.model.FlightOfferDTO;

import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary.Aircraft;
import lombok.*;
import reactor.core.publisher.Mono;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FlightStops {
    @NonNull
    private String id;
    private String waitTime;
    @NonNull
    private String arrivalTime;
    @NonNull
    private String departureTime;
    @NonNull
    private AirlineInfo airlineInfo;
    @NonNull
    private String airportData;
    @NonNull
    private String departureAirport;
    @NonNull
    private String arrivalAirport;
    @NonNull
    private Aircraft aircraft;
    @NonNull
    private String duration;
}

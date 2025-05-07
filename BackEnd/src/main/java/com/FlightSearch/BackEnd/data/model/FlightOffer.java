package com.FlightSearch.BackEnd.data.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FlightOffer {
    @NonNull
    private Date departureDate;

    @NonNull
    private Date arrivalDate;

    @NonNull
    private AirlineInfo principalAirline;

    private AirlineInfo operatingAirline;

    @NonNull
    private String totalDuration;

    private FlightStops stops;

    @NonNull
    private Float price;

    @NonNull
    private Float pricePerTraveler;

    @NonNull
    private String currency;

}

package com.FlightSearch.BackEnd.data.model.flightOfferModels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stops {
    private String iataCode;
    private String duration;
    private String arrivalAt;
    private String departureAt;
}

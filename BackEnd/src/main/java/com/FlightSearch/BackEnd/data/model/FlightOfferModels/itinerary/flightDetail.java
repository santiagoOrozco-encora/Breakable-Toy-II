package com.FlightSearch.BackEnd.data.model.FlightOfferModels.itinerary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class flightDetail {
    private String iataCode;
    private String terminal;
    private String at;
}

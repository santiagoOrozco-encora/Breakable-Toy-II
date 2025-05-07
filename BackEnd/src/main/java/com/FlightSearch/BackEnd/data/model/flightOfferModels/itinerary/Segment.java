package com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary;

import lombok.Data;

@Data
public class Segment {
    private String id;
    private String carrierCode;
    private String number;
    private String duration;
    private flightDetail departure;
    private flightDetail arrival;
    private Aircraft aircraft;

}

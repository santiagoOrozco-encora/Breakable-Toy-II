package com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary;

import com.FlightSearch.BackEnd.data.model.flightOfferModels.Stops;
import lombok.Data;

import java.util.List;

@Data
public class Segment {
    private String id;
    private String carrierCode;
    private String number;
    private String duration;
    private flightDetail departure;
    private flightDetail arrival;
    private Aircraft aircraft;
    private Operating operating;
    private List<Stops> stops;
}

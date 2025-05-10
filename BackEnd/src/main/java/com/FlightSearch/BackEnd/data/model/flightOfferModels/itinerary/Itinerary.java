package com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary;

import lombok.Data;

import java.util.List;

@Data
public class Itinerary {
    private String duration;
    private List<Segment> segments;
}

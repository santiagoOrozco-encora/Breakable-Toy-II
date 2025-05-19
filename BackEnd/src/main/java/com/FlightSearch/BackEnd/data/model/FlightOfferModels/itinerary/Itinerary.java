package com.FlightSearch.BackEnd.data.model.FlightOfferModels.itinerary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    private String duration;
    private List<Segment> segments;
}

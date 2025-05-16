package com.FlightSearch.BackEnd.data.model.flightOfferModels;

import com.FlightSearch.BackEnd.data.model.flightOfferModels.itinerary.Itinerary;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing.TravelerPricings;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightOffer {
    private String id;
    private List<Itinerary> itineraries;
    private Price price;
    private List<String> validatingAirlineCodes;
    private List<TravelerPricings> travelerPricings;
}

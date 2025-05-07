package com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing;

import com.FlightSearch.BackEnd.data.model.flightOfferModels.Price;
import lombok.Data;

import java.util.List;

@Data
public class TravelerPricings {
    private String travelerId;
    private Price price;
    private String travelerType;
    private String fareOption;
    private List<FareDetailsBySegment> fareDetailsBySegment;
}

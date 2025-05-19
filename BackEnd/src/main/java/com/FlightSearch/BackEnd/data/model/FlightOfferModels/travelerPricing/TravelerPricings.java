package com.FlightSearch.BackEnd.data.model.FlightOfferModels.travelerPricing;

import com.FlightSearch.BackEnd.data.model.FlightOfferModels.Price;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TravelerPricings {
    private String travelerId;
    private Price price;
    private String travelerType;
    private String fareOption;
    private List<FareDetailsBySegment> fareDetailsBySegment;
}

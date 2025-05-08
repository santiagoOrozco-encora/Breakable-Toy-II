package com.FlightSearch.BackEnd.data.model.apiRespose;

import com.FlightSearch.BackEnd.data.model.flightOfferModels.FlightOffer;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.OfferDictionary;
import lombok.Data;

import java.util.List;

@Data
public class FlightResponse {
    private List<FlightOffer> data;
    private OfferDictionary dictionaries;
}

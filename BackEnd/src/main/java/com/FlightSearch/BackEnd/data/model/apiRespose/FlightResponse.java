package com.FlightSearch.BackEnd.data.model.apiRespose;

import com.FlightSearch.BackEnd.data.model.FlightOfferModels.FlightOffer;
import com.FlightSearch.BackEnd.data.model.FlightOfferModels.OfferDictionary;
import lombok.Data;

import java.util.List;

@Data
public class FlightResponse {
    private List<FlightOffer> data;
    private OfferDictionary dictionaries;
}

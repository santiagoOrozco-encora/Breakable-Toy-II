package com.FlightSearch.BackEnd.data.model.FlightOfferModels;

import lombok.Data;

import java.util.Map;

@Data
public class OfferDictionary {
    private Map<String,Location> locations;
    private Map<String,String> aircraft;
    private Map<String,String> currencies;
    private Map<String,String> carriers;
}

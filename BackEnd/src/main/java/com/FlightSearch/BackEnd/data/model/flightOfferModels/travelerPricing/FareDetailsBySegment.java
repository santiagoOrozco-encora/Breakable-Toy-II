package com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing;

import lombok.Data;

import java.util.List;

@Data
public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    private String classF;
    private List<Amenities> amenities;
    private IncludedCheckedBags includedCheckedBags;
    private IncludedCabinBags includedCabinBags;
}

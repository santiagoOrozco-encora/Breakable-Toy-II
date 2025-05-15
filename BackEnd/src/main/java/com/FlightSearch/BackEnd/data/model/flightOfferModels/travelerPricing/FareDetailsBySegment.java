package com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    @JsonProperty(value = "class")
    private String clase;
    private List<Amenities> amenities;
    private IncludedCheckedBags includedCheckedBags;
    private IncludedCabinBags includedCabinBags;
}

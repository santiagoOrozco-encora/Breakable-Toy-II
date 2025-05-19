package com.FlightSearch.BackEnd.data.model.FlightOfferModels.travelerPricing;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FareDetailsBySegment {
    private String segmentId;
    private String cabin;
    @JsonProperty(value = "class")
    private String clase;
    private List<Amenities> amenities;
    private IncludedCheckedBags includedCheckedBags;
    private IncludedCabinBags includedCabinBags;
}

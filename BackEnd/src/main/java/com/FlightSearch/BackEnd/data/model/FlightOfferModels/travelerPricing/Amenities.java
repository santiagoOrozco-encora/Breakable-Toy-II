package com.FlightSearch.BackEnd.data.model.FlightOfferModels.travelerPricing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Amenities {
    private String description;
    private String amenityType;
    private Boolean isChargeable;
}

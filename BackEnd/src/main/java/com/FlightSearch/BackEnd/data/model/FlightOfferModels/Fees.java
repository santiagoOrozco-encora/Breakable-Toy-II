package com.FlightSearch.BackEnd.data.model.FlightOfferModels;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fees {
    private String amount;
    private String type;
}

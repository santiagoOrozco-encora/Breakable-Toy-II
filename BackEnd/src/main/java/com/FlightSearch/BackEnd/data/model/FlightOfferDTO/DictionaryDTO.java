package com.FlightSearch.BackEnd.data.model.FlightOfferDTO;

import com.FlightSearch.BackEnd.data.model.AirportData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Map;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DictionaryDTO {
    private Map<String, AirportData> airports;
    private Map<String,String> aircraft;
    private Map<String,String> currencies;
    private Map<String,String> carriers;
}

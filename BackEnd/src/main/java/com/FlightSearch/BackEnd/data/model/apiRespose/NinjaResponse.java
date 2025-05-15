package com.FlightSearch.BackEnd.data.model.apiRespose;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NinjaResponse {
    private String iata;
    private String name;
    private String city;
    private String country;
}

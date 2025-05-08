package com.FlightSearch.BackEnd.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Address {
    private String cityName;
    private String countryName;
}

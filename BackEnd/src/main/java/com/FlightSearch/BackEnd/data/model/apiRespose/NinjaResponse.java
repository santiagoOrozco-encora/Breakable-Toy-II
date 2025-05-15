package com.FlightSearch.BackEnd.data.model.apiRespose;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NinjaResponse {
    private String iata;
    private String name;
    private String city;
    private String country;
}

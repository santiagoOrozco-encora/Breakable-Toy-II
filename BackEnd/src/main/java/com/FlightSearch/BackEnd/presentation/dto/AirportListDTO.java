package com.FlightSearch.BackEnd.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportListDTO {
    private String AirportName;
    private String IATACode;
    private String CityName;
}

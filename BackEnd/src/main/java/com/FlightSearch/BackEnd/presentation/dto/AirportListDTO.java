package com.FlightSearch.BackEnd.presentation.dto;

import com.FlightSearch.BackEnd.data.model.Adress;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AirportListDTO {
    private String AirportName;
    private String IATACode;
    private Adress address;
}

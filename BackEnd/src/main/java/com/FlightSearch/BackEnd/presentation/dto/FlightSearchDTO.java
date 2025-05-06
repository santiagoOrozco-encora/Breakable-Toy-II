package com.FlightSearch.BackEnd.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class FlightSearchDTO {
    private String passengers;
    private Date departureDate;
    private Date returnDate;
    private String origin;
    private String destination;
    private Boolean nonStop;
}

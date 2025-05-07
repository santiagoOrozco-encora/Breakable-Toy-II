package com.FlightSearch.BackEnd.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FlightSearchDTO {
    @NonNull
    private String passengers;
    @NonNull
    private String departureDate;

    private String returnDate;
    @NonNull
    private String origin;
    @NonNull
    private String destination;
    @NonNull
    private String currency;
    @NonNull
    private Boolean nonStop;
}

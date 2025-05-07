package com.FlightSearch.BackEnd.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class AirportData {
    @NonNull
    private String name;
    @NonNull
    private String iataCode;
    private Adress address;
}

package com.FlightSearch.BackEnd.data.model;

import lombok.Data;

@Data
public class AirportData {
    private String name;
    private String iataCode;
    private Adress address;
}

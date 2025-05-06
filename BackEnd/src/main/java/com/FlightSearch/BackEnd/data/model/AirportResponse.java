package com.FlightSearch.BackEnd.data.model;

import lombok.Data;

import java.util.List;

@Data
public class AirportResponse {
    private List<AirportData> data;
}

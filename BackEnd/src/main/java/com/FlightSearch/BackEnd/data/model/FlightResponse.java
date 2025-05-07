package com.FlightSearch.BackEnd.data.model;

import lombok.Data;

import java.util.List;

@Data
public class FlightResponse {
    private List<FlightOffer> data;
}

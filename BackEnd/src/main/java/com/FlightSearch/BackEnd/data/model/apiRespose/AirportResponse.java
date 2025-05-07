package com.FlightSearch.BackEnd.data.model.apiRespose;

import com.FlightSearch.BackEnd.data.model.AirportData;
import lombok.Data;

import java.util.List;

@Data
public class AirportResponse {
    private List<AirportData> data;
}

package com.FlightSearch.BackEnd.data.model.apiRespose;

import com.FlightSearch.BackEnd.data.model.AirportData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirportResponse {
    private List<AirportData> data;
}

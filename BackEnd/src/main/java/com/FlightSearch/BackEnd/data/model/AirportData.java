package com.FlightSearch.BackEnd.data.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class AirportData {
    private String name;
    @NonNull
    private String iataCode;
    private Address address;
}

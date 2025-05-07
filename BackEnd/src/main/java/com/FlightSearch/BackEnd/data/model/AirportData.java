package com.FlightSearch.BackEnd.data.model;

import lombok.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class AirportData {
    @NonNull
    private String name;
    @NonNull
    private String iataCode;
    private Adress address;
}

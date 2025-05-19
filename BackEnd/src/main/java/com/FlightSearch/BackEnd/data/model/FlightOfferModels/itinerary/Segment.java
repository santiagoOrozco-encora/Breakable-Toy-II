package com.FlightSearch.BackEnd.data.model.FlightOfferModels.itinerary;

import com.FlightSearch.BackEnd.data.model.FlightOfferModels.Stops;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Segment {
    private String id;
    private String carrierCode;
    private String number;
    private String duration;
    private flightDetail departure;
    private flightDetail arrival;
    private Aircraft aircraft;
    private Operating operating;
    private List<Stops> stops;
}

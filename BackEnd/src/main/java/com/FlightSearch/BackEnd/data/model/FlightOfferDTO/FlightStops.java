package com.FlightSearch.BackEnd.data.model.FlightOfferDTO;

import com.FlightSearch.BackEnd.data.model.FlightOfferModels.Stops;
import com.FlightSearch.BackEnd.data.model.FlightOfferModels.itinerary.Aircraft;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FlightStops {
    @NonNull
    private String id;
    @NonNull
    private String waitTime;
    @NonNull
    private String arrivalTime;
    @NonNull
    private String departureTime;
    @NonNull
    private AirlineInfo airlineInfo;
    @NonNull
    private String airportData;
    @NonNull
    private String departureAirport;
    @NonNull
    private String arrivalAirport;
    @NonNull
    private Aircraft aircraft;
    @NonNull
    private String duration;
    @NonNull
    private String number;
    @NonNull
    private String carrierCode;
    private List<Stops> stops;
    private String operating;
}

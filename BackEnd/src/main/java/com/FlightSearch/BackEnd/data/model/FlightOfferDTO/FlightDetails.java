package com.FlightSearch.BackEnd.data.model.FlightOfferDTO;

import com.FlightSearch.BackEnd.data.model.FlightOfferModels.itinerary.Aircraft;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FlightDetails {
    @NonNull
    private String initialDayTime;
    @NonNull
    private String initialAirport;
    @NonNull
    private String FinalDayTime;
    @NonNull
    private String finalAirport;
    @NonNull
    private AirlineInfo airline;
    @NonNull
    private String totalTime;
    @NonNull
    private List<FlightStops> segments;

    private Aircraft aircraft;

}

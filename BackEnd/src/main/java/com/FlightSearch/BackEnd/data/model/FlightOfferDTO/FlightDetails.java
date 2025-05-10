package com.FlightSearch.BackEnd.data.model.FlightOfferDTO;

import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.Price;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing.TravelerPricings;
import lombok.*;
import reactor.core.publisher.Mono;

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

    private List<FlightStops> flightStops;
}

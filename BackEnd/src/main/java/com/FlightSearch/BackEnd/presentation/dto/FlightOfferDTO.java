package com.FlightSearch.BackEnd.presentation.dto;

import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.FlightDetails;
import com.FlightSearch.BackEnd.data.model.flightOfferModels.Price;

import com.FlightSearch.BackEnd.data.model.flightOfferModels.travelerPricing.TravelerPricings;
import lombok.*;
import reactor.core.publisher.Mono;

import java.util.List;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class FlightOfferDTO {
    @NonNull
    private String id;
    @NonNull
    private FlightDetails goingFlight;
    @NonNull
    private Price price;
    @NonNull
    private List<TravelerPricings> travelerPricings;
    @NonNull
    private String validatedAirlineCode;

    private FlightDetails returningFlight;
}

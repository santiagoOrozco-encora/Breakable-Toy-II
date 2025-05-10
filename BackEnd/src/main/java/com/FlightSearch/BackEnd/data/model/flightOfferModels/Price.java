package com.FlightSearch.BackEnd.data.model.flightOfferModels;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Price {
    @NonNull
    private String total;
    @NonNull
    private String base;

    private String grandTotal;
    private String currency;
}

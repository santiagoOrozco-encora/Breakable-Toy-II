package com.FlightSearch.BackEnd.data.model.flightOfferModels;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Price {
    @NonNull
    private String total;
    @NonNull
    private String base;

    private List<Fees> fees;
    private String grandTotal;
    private String currency;
}

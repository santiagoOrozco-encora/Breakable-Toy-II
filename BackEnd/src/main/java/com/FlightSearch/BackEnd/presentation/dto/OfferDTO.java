package com.FlightSearch.BackEnd.presentation.dto;

import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.DictionaryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferDTO {
    private List<FlightOfferDTO> offers;
    private DictionaryDTO dictionaryDTO;
}

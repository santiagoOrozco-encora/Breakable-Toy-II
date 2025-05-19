package com.FlightSearch.BackEnd.service.ApiClient;

import com.FlightSearch.BackEnd.data.model.Address;
import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.apiRespose.AirportResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.NinjaResponse;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Component
public class NinjaServiceImp implements FlightApiService {

    private final WebClient NinjaClient;
    @Value("${ninja.key}")
    private String key;

    public NinjaServiceImp(WebClient.Builder NinjaClient){
        this.NinjaClient = NinjaClient.baseUrl("https://api.api-ninjas.com").build();
    }

    @Override
    public AirportResponse airportSearch(String keyword){
        List<NinjaResponse> res = NinjaClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v1/airports")
                        .queryParam("iata",keyword)
                        .build())
                .header("X-Api-Key",key)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<NinjaResponse>>() {}) // Use ParameterizedTypeReference for List
                .block();
        System.out.println(res);
        if(res == null || res.isEmpty()){
            return new AirportResponse();
        }
        List<AirportData> airportList = res.stream()
                .map(ninjaResponse -> {
                    Address address = new Address(ninjaResponse.getCity(), ninjaResponse.getCountry());
                    return new AirportData(ninjaResponse.getName(),ninjaResponse.getIata(),address);
                })
                .toList();

        return new AirportResponse(airportList);
    }

    @Override
    public FlightResponse flightOfferSearch(FlightSearchDTO searchDetails) {
        return null;
    }

    @Override
    public String getAuth() {
        return "";
    }
}

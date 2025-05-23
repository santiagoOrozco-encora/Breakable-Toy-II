package com.FlightSearch.BackEnd.service.ApiClient;

import com.FlightSearch.BackEnd.data.model.apiRespose.AirportResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.Map;

@Component
public class AmadeousFlightApiServiceImpl implements FlightApiService{

    private final WebClient amadeousClient;
    @Value("${amadeous.key}")
    private String apiKey;
    @Value("${amadeous.secret}")
    private String apiSecret;
    private volatile String authToken;

    public AmadeousFlightApiServiceImpl(WebClient.Builder webClientBuilder) {
        this.amadeousClient = webClientBuilder.baseUrl("https://test.api.amadeus.com").build();
    }

    @Override
    public String getAuth() {
        MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
        body.add("grant_type","client_credentials");
        body.add("client_id", apiKey);
        body.add("client_secret", apiSecret);
        return amadeousClient.post().uri("/v1/security/oauth2/token").header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE).
                body(BodyInserters.fromFormData(body)).
                accept(MediaType.APPLICATION_JSON).
                retrieve().
                bodyToMono(Map.class).
                map(response->{
                    this.authToken = (String) response.get("access_token");
                    return this.authToken;
                }).onErrorResume(
                        e->{
                            System.err.println("Error al obtener el token: " + e.getMessage());
                            return Mono.empty();
                        }
                ).block();
    }

    @Override
    public AirportResponse airportSearch(String keyword){

        String token = getAuth();

        return amadeousClient.get()
                .uri(uriBuilder -> uriBuilder.path("v1/reference-data/locations")
                        .queryParam("subType", "AIRPORT")
                        .queryParam("keyword", keyword)
                        .queryParam("view", "LIGHT")

                        .build())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError,clientResponse -> {
                    if(clientResponse.statusCode() == HttpStatus.TOO_MANY_REQUESTS){
                        return Mono.error(new TooManyRequestsException("Too many requests to the airport search API"));
                    } else {
                        return Mono.error(new RuntimeException("Client error during airport search: " + clientResponse.statusCode()));
                    }
                })
                .bodyToMono(AirportResponse.class)
                .retryWhen(Retry.from(retrySpec -> retrySpec
                        .filter(throwable -> throwable instanceof TooManyRequestsException)
                        .delayElements(Duration.ofMillis(500))))
//                        .doBeforeRetry(retrySignal -> System.out.println("Too many requests, retrying airport search... attempt " + (retrySignal.totalRetries() + 1)))))
                .block();
    }

    static class TooManyRequestsException extends RuntimeException {
        public TooManyRequestsException(String message) {
            super(message);
        }
    }

    @Override
    public FlightResponse flightOfferSearch(FlightSearchDTO details){
        String token = getAuth();
        UriComponentsBuilder uri = UriComponentsBuilder.fromPath("v2/shopping/flight-offers")
                .queryParam("originLocationCode", details.getOrigin())
                .queryParam("destinationLocationCode", details.getDestination())
                .queryParam("departureDate", details.getDepartureDate())
                .queryParam("adults", details.getPassengers())
                .queryParam("nonStop", details.getNonStop().toString())
                .queryParam("currencyCode", details.getCurrency());
//                .queryParam("max","20");

        if (details.getReturnDate() != null && !details.getReturnDate().isEmpty()) {
            uri.queryParam("returnDate",details.getReturnDate());
        }
        return amadeousClient.get()
                .uri(uri.toUriString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(FlightResponse.class).block();
    }

}

package com.FlightSearch.BackEnd.service;
import com.FlightSearch.BackEnd.data.model.Address;
import com.FlightSearch.BackEnd.data.model.AirportData;
import com.FlightSearch.BackEnd.data.model.FlightOfferDTO.DictionaryDTO;
import com.FlightSearch.BackEnd.data.model.FlightOfferModels.*;
import com.FlightSearch.BackEnd.data.model.FlightOfferModels.itinerary.*;
import com.FlightSearch.BackEnd.data.model.FlightOfferModels.travelerPricing.*;
import com.FlightSearch.BackEnd.data.model.apiRespose.AirportResponse;
import com.FlightSearch.BackEnd.data.model.apiRespose.FlightResponse;
import com.FlightSearch.BackEnd.presentation.dto.AirportListDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightOfferDTO;
import com.FlightSearch.BackEnd.presentation.dto.FlightSearchDTO;
import com.FlightSearch.BackEnd.presentation.dto.OfferDTO;
import com.FlightSearch.BackEnd.service.ApiClient.FlightApiService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Qualifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.*;

@ExtendWith(MockitoExtension.class)
public class FlightServiceTest {

    @Mock
    @Qualifier("amadeousFlightApiServiceImpl")
    private FlightApiService amadeousFlightApiServiceImplMock;

    @Mock
    @Qualifier("ninjaServiceImp")
    private FlightApiService ninjaServiceImpMock;

    private FlightService flightService;

    private List<AirportData> airportDataList;
    private FlightSearchDTO flightSearchDTO;
    private FlightResponse flightResponse;
    private OfferDictionary offerDictionary;
    private List<FlightOffer> flightOffers;
    private AirportResponse airportResponse;

    @BeforeEach
    void setUp() {
        flightService = new FlightService(amadeousFlightApiServiceImplMock, ninjaServiceImpMock);

        airportDataList = Arrays.asList(
                createAirportData("MEX", "Mexico City International Airport", "Mexico", "Mexico City"),
                createAirportData("JFK", "John F. Kennedy International Airport", "USA", "New York")
        );
        airportResponse = new AirportResponse(airportDataList);

        flightSearchDTO = new FlightSearchDTO("1","2025-05-20","2025-05-25","MEX","JFK","MXN",false);

        offerDictionary = new OfferDictionary();
        offerDictionary.setLocations(Map.of("MEX", new Location("MEX","MX"), "JFK", new Location("NYC","US")));
        offerDictionary.setCarriers(Map.of("AM", "Aeromexico", "DL", "Delta"));

        flightOffers = Arrays.asList(
                createFlightOffer("1", "PT5H30M", 150.50, "AM", "2025-05-20T10:00:00", "MEX", "2025-05-20T15:30:00", "JFK"),
                createFlightOffer("2", "PT3H00M", 200.00, "DL", "2025-05-20T12:00:00", "MEX", "2025-05-20T15:00:00", "JFK"),
                createFlightOffer("3", "PT7H00M", 100.00, "AM", "2025-05-20T08:00:00", "MEX", "2025-05-20T15:00:00", "JFK"),
                createFlightOffer("4", "PT4H15M", 180.75, "DL", "2025-05-20T14:00:00", "MEX", "2025-05-20T18:15:00", "JFK"),
                createFlightOffer("5", "PT5H30M", 150.50, "AM", "2025-05-20T10:00:00", "MEX", "2025-05-20T15:30:00", "JFK"),
                createFlightOffer("6", "PT3H00M", 200.00, "DL", "2025-05-20T12:00:00", "MEX", "2025-05-20T15:00:00", "JFK"),
                createFlightOffer("7", "PT7H00M", 100.00, "AM", "2025-05-20T08:00:00", "MEX", "2025-05-20T15:00:00", "JFK"),
                createFlightOffer("8", "PT4H15M", 180.75, "DL", "2025-05-20T14:00:00", "MEX", "2025-05-20T18:15:00", "JFK"),
                createFlightOffer("9", "PT5H30M", 150.50, "AM", "2025-05-20T10:00:00", "MEX", "2025-05-20T15:30:00", "JFK"),
                createFlightOffer("10", "PT3H00M", 200.00, "DL", "2025-05-20T12:00:00", "MEX", "2025-05-20T15:00:00", "JFK"),
                createFlightOffer("11", "PT7H00M", 100.00, "AM", "2025-05-20T08:00:00", "MEX", "2025-05-20T15:00:00", "JFK"),
                createFlightOffer("12", "PT4H15M", 180.75, "DL", "2025-05-20T14:00:00", "MEX", "2025-05-20T18:15:00", "JFK")
        );

        flightResponse = new FlightResponse();
        flightResponse.setData(flightOffers);
        flightResponse.setDictionaries(offerDictionary);


    }

    private AirportData createAirportData(String iataCode, String name, String countryName, String cityName) {
        Address address = new Address(cityName,countryName);
        return new AirportData(name,iataCode,address);

    }

    private FlightOffer createFlightOffer(String id, String duration, double price, String carrierCode, String departureAt, String origin, String arrivalAt, String destination) {
        flightDetail details =  new flightDetail("MEX","2","2025-05-16T06:30:00");
        Aircraft aircraft = new Aircraft("321");
        Operating operating = new Operating(carrierCode);
        Stops stops = new Stops("MEX","2:00",arrivalAt,departureAt);

        Segment segment = new Segment("1",carrierCode,"32","PT20H20M",details,details,aircraft,operating,List.of(stops));
        Itinerary itinerary = new Itinerary("PT17H20M",List.of(segment));

        Price price1 = new Price("22","10",List.of(new Fees("23","chargeable")),"2222","MXN");

        FareDetailsBySegment fareDetailsBySegment = new FareDetailsBySegment(id,"ECONOMIC","CLASS",List.of(new Amenities("des","type",true)), new IncludedCheckedBags(1),new IncludedCabinBags(1));
        TravelerPricings travelerPricings = new TravelerPricings(id,price1,"ADULT","OPTION",List.of(fareDetailsBySegment));

        return new FlightOffer(id,List.of(itinerary),price1,List.of("AC,LU"),List.of(travelerPricings));
    }

    @Test
    void searchAirport_foundInAmadeus() {
        when(amadeousFlightApiServiceImplMock.airportSearch(anyString())).thenReturn(new AirportResponse(airportDataList.subList(0, 1)));
        List<AirportListDTO> result = flightService.searchAirport("MEX");
        assertEquals(1, result.size());
        assertEquals("MEX", result.getFirst().getValue());
    }

    @Test
    void searchAirport_notFoundInAmadeus_foundInNinja() {
        when(amadeousFlightApiServiceImplMock.airportSearch(anyString())).thenReturn(new AirportResponse(Collections.emptyList()));
        when(ninjaServiceImpMock.airportSearch(eq("JFK"))).thenReturn(new AirportResponse(airportDataList.subList(1,2)));
        List<AirportListDTO> result = flightService.searchAirport("JFK");
        assertEquals(1, result.size());
        assertEquals("JFK", result.getFirst().getValue());
    }

    @Test
    void searchAirport_notFoundInBoth() {
        when(amadeousFlightApiServiceImplMock.airportSearch(anyString())).thenReturn(new AirportResponse(Collections.emptyList()));
        when(ninjaServiceImpMock.airportSearch(anyString())).thenReturn(new AirportResponse(Collections.emptyList()));
        List<AirportListDTO> result = flightService.searchAirport("XYZ");

        assertEquals(0,result.size());
    }

    @Test
    void searchFlight_cacheHit_lessThanPageLimit() {
        flightService.offerCache.put(flightSearchDTO, new OfferDTO(3, List.of(new FlightOfferDTO()), new DictionaryDTO()));
        OfferDTO result = flightService.searchFlight(flightSearchDTO);
        assertEquals(3, result.getSize());
        assertEquals(1, result.getOffers().size());
    }

    @Test
    void searchFlight_cacheHit_moreThanPageLimit() {
        List<FlightOfferDTO> offers = new ArrayList<>();
        for (int i = 0; i < 15; i++) {
            offers.add(new FlightOfferDTO());
        }
        flightService.offerCache.put(flightSearchDTO, new OfferDTO(15, offers, new DictionaryDTO()));
        OfferDTO result = flightService.searchFlight(flightSearchDTO);
        assertEquals(15, result.getSize());
        assertEquals(10, result.getOffers().size());
    }

    @Test
    void searchFlight_cacheMiss_apiCallSuccess_lessThanPageLimit() {
        when(amadeousFlightApiServiceImplMock.flightOfferSearch(any())).thenReturn(flightResponse);
        when(amadeousFlightApiServiceImplMock.airportSearch(anyString())).thenReturn(airportResponse);
        when(ninjaServiceImpMock.airportSearch(anyString())).thenReturn(airportResponse);
        OfferDTO result = flightService.searchFlight(flightSearchDTO);
        assertNotNull(result);
        assertEquals(flightOffers.size(), result.getSize());
    }

    @Test
    void searchFlight_cacheMiss_apiCallSuccess_moreThanPageLimit() {
        List<FlightOffer> manyOffers = new ArrayList<>(flightOffers);

        FlightResponse largeResponse = new FlightResponse();
        largeResponse.setData(manyOffers);
        largeResponse.setDictionaries(offerDictionary);
        when(amadeousFlightApiServiceImplMock.flightOfferSearch(any())).thenReturn(largeResponse);
        when(amadeousFlightApiServiceImplMock.airportSearch(anyString())).thenReturn(airportResponse);
        when(ninjaServiceImpMock.airportSearch(anyString())).thenReturn(airportResponse);

        OfferDTO result = flightService.searchFlight(flightSearchDTO);
        assertNotNull(result);
        assertEquals(manyOffers.size(), result.getSize());
        assertEquals(10, result.getOffers().size());
    }

    @Test
    void searchFlight_cacheMiss_apiCallEmptyData() {
        FlightResponse emptyResponse = new FlightResponse();
        emptyResponse.setData(Collections.emptyList());
        when(amadeousFlightApiServiceImplMock.flightOfferSearch(any())).thenReturn(emptyResponse);

        OfferDTO result = flightService.searchFlight(flightSearchDTO);
        assertNotNull(result);
        assertEquals(0, result.getSize());
        assertNull(result.getOffers());
    }

    @Test
    void filterFlights_noCache() {
        OfferDTO result = flightService.filterFlights("price", "asc", 0);
        assertNotNull(result);
        assertNull(result.getOffers());
    }
}

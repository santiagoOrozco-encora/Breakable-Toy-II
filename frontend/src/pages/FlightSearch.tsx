import Input from "../components/atoms/Input";
import { useForm, Controller, Control } from "react-hook-form";
import { Airport, FlightSearch, SelectOption } from "../api/types";
import { getFlightOffers, getAirports } from "../api/service";
import Button from "../components/atoms/Button";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "MXN", label: "MXN" },
];

const FlightSearchPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FlightSearch>();

  const loadAirportOptions = (inputValue: string): Promise<SelectOption[]> => {
    return new Promise<SelectOption[]>((resolve) => {
      setTimeout(() => {
        // For now, we're using CURRENCY_OPTIONS as a fallback
        // When you're ready to use real airport data, replace this with:
        const airports = getAirports(inputValue);
        // const filtered = airports.filter(airport =>
        //   airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        //   airport.code.toLowerCase().includes(inputValue.toLowerCase())
        // ).map(airport => ({
        //   value: airport.code,
        //   label: `${airport.name} (${airport.code})`
        // }));
        // resolve(filtered);
        console.log(airports);
        resolve(airports);
      }, 1000);
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const flights = await getFlightOffers(data);
    console.log(flights);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-2xl font-bold text-red-500">Flight search</h1>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        {/* <Input
          label="Departure airport"
          id="from"
          type="text"
          placeholder="LAX"
          {...register("originLocationCode", { required: true })}
        /> */}
        <Controller
          name="originLocationCode"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <AsyncSelect<SelectOption>
              ref={ref}
              cacheOptions
              defaultOptions={[]}
              loadOptions={loadAirportOptions}
              onChange={(selected: SingleValue<SelectOption>) =>
                onChange(selected?.value || "")
              }
              placeholder="Select departure airport..."
              className="w-full"
              classNamePrefix="select"
            />
          )}
        />
        {errors.originLocationCode && (
          <p className="text-red-500">This field is required</p>
        )}
        <Input
          label="Arrival airport"
          id="to"
          type="text"
          placeholder="MAD"
          {...register("destinationLocationCode", { required: true })}
        />
        {errors.destinationLocationCode && (
          <p className="text-red-500">This field is required</p>
        )}
        <Input
          label="Departure date"
          id="date"
          type="date"
          {...register("departureDate", { required: true })}
        />
        {errors.departureDate && (
          <p className="text-red-500">This field is required</p>
        )}
        <Input
          label="Return date"
          id="returnDate"
          type="date"
          {...register("returnDate")}
        />
        <Input
          label="Passengers"
          id="passengers"
          type="number"
          placeholder="Number of passengers"
          {...register("adults", { required: true })}
        />
        <Input
          label="Currency"
          id="currency"
          type="select"
          options={CURRENCY_OPTIONS}
          {...register("currencyCode", { required: true })}
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>
      <a href="/FlightResults">Results</a>
    </div>
  );
};

export default FlightSearchPage;

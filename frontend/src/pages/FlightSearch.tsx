import Input from "../components/atoms/Input";
import { useForm, Controller } from "react-hook-form";
import { FlightSearch, SelectOption } from "../api/types";
import { getFlightOffers, getAirports } from "../api/service";
import Button from "../components/atoms/Button";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";
import { useCallback, useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import type { GroupBase, OptionsOrGroups } from "react-select";

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "MXN", label: "MXN" },
];

const FlightSearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FlightSearch>();

  // Debounced search function
  const searchAirports = useCallback(
    async (inputValue: string, callback: (options: SelectOption[]) => void) => {
      if (!inputValue) {
        callback([]);
        return;
      }
      try {
        const airports = await getAirports(inputValue);
        callback(airports);
      } catch (error) {
        callback([]);
      }
    },
    []
  );

  // Create debounced version of search function
  const debouncedSearch = useMemo(
    () => debounce(searchAirports, 500), // 500ms delay
    [searchAirports]
  );

  // Cleanup debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const loadAirportOptions = useCallback(
    (inputValue: string, callback: (options: SelectOption[]) => void) => {
      return debouncedSearch(inputValue, callback);
    },
    [debouncedSearch]
  );

  // Wrapper function for AsyncSelect's loadOptions
  const loadOptions = useCallback(
    (
      inputValue: string,
      callback: (
        options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>
      ) => void
    ) => {
      loadAirportOptions(
        inputValue,
        callback as (options: SelectOption[]) => void
      );
      return undefined; // Return undefined to satisfy the type
    },
    [loadAirportOptions]
  );

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setLoading(true);
    setError(null);
    try {
      const flights = await getFlightOffers(data);
      setLoading(false);
      navigate("/FlightResults", { state: { flights } });
    } catch (e) {
      setLoading(false);
      setError("Failed to fetch flight offers.");
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-xl font-semibold text-blue-500">
          Loading flight offers...
        </div>
        {/* Optionally add a spinner here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-2xl font-bold text-red-500">Flight search</h1>
      {error && <div className="text-red-500 font-medium mb-2">{error}</div>}
      <form className="flex flex-col gap-2 w-1/3 relative" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          {/* DEPARTURE AIRPORT */}
          <div className="flex flex-row gap-2 items-center">
            <label
              htmlFor="originLocationCode"
              className="text-md font-medium text-end w-1/4"
            >
              Departure airport
            </label>
            <div className="w-3/4">
              <Controller
                name="originLocationCode"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, ref } }) => (
                  <AsyncSelect
                    ref={ref}
                    cacheOptions
                    defaultOptions={[]}
                    loadOptions={loadOptions}
                    onChange={(selected: SingleValue<SelectOption>) =>
                      onChange(selected?.value || "")
                    }
                    placeholder="Select departure airport..."
                    classNames={{
                      container: () => "rounded-md w-full",
                    }}
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
          </div>
          <div className="h-5 w-3/4 flex justify-center">
            {errors.originLocationCode && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        </div>

        {/* ARRIVAL AIRPORT */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 items-center">
            <label
              htmlFor="destinationLocationCode"
              className="text-md font-medium text-end w-1/4"
            >
              Arrival airport
            </label>
            <div className="w-3/4">
              <Controller
                name="destinationLocationCode"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, ref } }) => (
                  <AsyncSelect
                    ref={ref}
                    cacheOptions
                    defaultOptions={[]}
                    loadOptions={loadOptions}
                    onChange={(selected: SingleValue<SelectOption>) =>
                      onChange(selected?.value || "")
                    }
                    placeholder="Select arrival airport..."
                    classNames={{
                      container: () => "rounded-md w-full",
                    }}
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
          </div>
          <div className="h-5 w-3/4 flex justify-center">
            {errors.destinationLocationCode && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        </div>

        {/* DEPARTURE DATE */}
        <Input
          label="Departure date"
          id="date"
          type="date"
          {...register("departureDate", { required: true })}
        />
        <div className="h-5 w-3/4 flex justify-center">
          {errors.departureDate && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* RETURN DATE */}
        <Input
          label="Return date"
          id="returnDate"
          type="date"
          {...register("returnDate")}
        />
        <div className="h-5 w-3/4 flex justify-center">
          {errors.returnDate && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* PASSENGERS */}
        <Input
          label="Passengers"
          id="passengers"
          type="number"
          placeholder="Number of passengers"
          {...register("adults", { required: true })}
        />
        <div className="h-5 w-3/4 flex justify-center">
          {errors.adults && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* CURRENCY */}
        <Input
          label="Currency"
          id="currency"
          type="select"
          options={CURRENCY_OPTIONS}
          {...register("currencyCode", { required: true })}
        />
        <div className="h-5 w-3/4 flex justify-center">
          {errors.currencyCode && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* NON STOP */}
        <Input
          label="Non Stop"
          id="nonStop"
          type="checkbox"
          {...register("nonStop")}
        />

        {/* SUBMIT */}
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>
    </div>
  );
};

export default FlightSearchPage;

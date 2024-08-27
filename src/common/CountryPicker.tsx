import { useHolidayStore } from "../store";
import { useEffect } from "react";
import Select from "react-select";

interface CountryPickerProps {
  onSelect?: (country?: string) => unknown;
  defaultValue?: string;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  onSelect,
  defaultValue,
}) => {
  const holidayStore = useHolidayStore();
  useEffect(() => {
    if (holidayStore.countryData.length < 1) holidayStore.fetchCountryData();
  }, []);
  const options = (holidayStore.countryData || []).map((country) => ({
    value: country["iso-3166"],
    label: country["country_name"],
  }));
  const customStyles = {
    option: (provided: unknown) => ({
      // @ts-expect-error provided is not object
      ...provided,
      color: "black",
    }),
    control: (provided: unknown) => ({
      // @ts-expect-error provided is not object
      ...provided,
      color: "black",
      width: "250px",
      minWidth: "250px",
      maxWidth: "250px",
    }),
    singleValue: (provided: unknown) => ({
      // @ts-expect-error provided is not object
      ...provided,
      color: "black",
    }),
  };
  console.log(defaultValue);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>You are located in:</p>
      <div
        style={{
          width: "100%",
          position: "relative",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Select
          // @ts-expect-error type unspecified
          onChange={(option: Option | null) =>
            onSelect ? onSelect(option?.value) : null
          }
          placeholder="Select your country"
          options={options}
          value={
            defaultValue
              ? options.find((option) => option.value === defaultValue)
              : null
          }
          styles={customStyles}
          isClearable={false}
        />
      </div>
    </div>
  );
};

export default CountryPicker;

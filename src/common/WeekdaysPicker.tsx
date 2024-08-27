import Select from "react-select";
import { daysOfWeek } from "../utils/date.ts";

interface WeekdaysPicker {
  onSelect?: (weekdays: string[]) => unknown;
  defaultValue?: string[];
}

const WeekdaysPicker: React.FC<WeekdaysPicker> = ({
  onSelect,
  defaultValue,
}) => {
  const options = daysOfWeek.map((aDay) => ({
    value: aDay,
    label: aDay,
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
      <p>Select Your Week Offs:</p>
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
          onChange={(options: readonly Option[]) =>
            onSelect ? onSelect(options.map((option) => option.value)) : null
          }
          isMulti
          placeholder="Select your country"
          options={options}
          value={
            defaultValue
              ? options.filter((option) => defaultValue.includes(option.value))
              : null
          }
          styles={customStyles}
          isClearable={false}
        />
      </div>
    </div>
  );
};

export default WeekdaysPicker;

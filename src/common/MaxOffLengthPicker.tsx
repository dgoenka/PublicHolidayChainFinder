import Select from "react-select";

interface MaxOffLengthPickerProps {
  onSelect?: (length: number) => unknown;
  defaultValue?: number;
}

const MaxOffLengthPicker: React.FC<MaxOffLengthPickerProps> = ({
  onSelect,
  defaultValue,
}) => {
  const options = [4, 3, 2].map((length) => ({
    value: length,
    label: length === 2 ? "1 day" : `${length - 1} days`,
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
      <p>Max days off at a stretch:</p>
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
          placeholder="Select your number of days off"
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

export default MaxOffLengthPicker;

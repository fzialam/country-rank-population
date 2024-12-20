import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const InputSearchCountryComponent = ({ data, onSelect, onClear }) => {
  return (
    <ReactSearchAutocomplete
      items={data}
      onSelect={onSelect}
      onClear={onClear}
      fuseOptions={{ keys: ["name"] }}
      resultStringKeyName="name"
      placeholder={"Search Country"}
      className="form-control search-container"
      style={{ backgroundColor: "#333", color: "#fff" }}
    />
  );
};

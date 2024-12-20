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
      styling={{ backgroundColor: "#eee", color: "#000", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"}}
    />
  );
};

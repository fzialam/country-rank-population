import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { InputSearchCountryComponent } from "./input-search-country-component";

export const CountrySelection = ({ country, onSelect, onClear, data }) => (
  <div className="mb-3 col-lg-6 d-flex flex-column align-items-center">
    {country ? (
      <div
        className="d-flex justify-content-center align-items-center mb-3"
        style={{ width: "350px", height: "200px", overflow: "hidden" }}
      >
        <img
          src={country.flag}
          alt={country.name}
          className="img-fluid"
          style={{ objectFit: "fill", width: "100%", height: "100%" }}
        />
      </div>
    ) : (
      <div
        className="bg-info-subtle border border-1 mb-3"
        style={{ height: "200px", width: "350px"}}
      />
    )}
    <label htmlFor="country" className="form-label text-center">
      Select Country
    </label>
    <InputSearchCountryComponent 
      data={data}
      onClear={onClear}
      onSelect={onSelect}
    />
  </div>
);

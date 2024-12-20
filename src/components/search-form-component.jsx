import { useState } from "react";
import { InputSearchCountryComponent } from "./input-search-country-component";
import { PopupDetailComponent } from "./pop-up-detail-component";

export const SearchFormComponent = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [popUp, setPopUp] = useState(false);

  const formatedData = data.map((country) => ({
    id: country.cca3,
    name: country.name.common,
  }));

  const handleClear = () => {
    setSelectedCountry(null);
  };

  const handleSelect = (x) => {
    setSelectedCountry(x);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      return alert("Invalid Country");
    }
      setPopUp(true);
  };

  return (
    <div className="container mb-3">
      <div className="d-flex justify-content-end">
        <form onSubmit={handleSubmit} className="w-25">
          <InputSearchCountryComponent
            data={formatedData}
            onClear={handleClear}
            onSelect={handleSelect}
          />
        </form>
      </div>
      {popUp && (
        <PopupDetailComponent
          data={selectedCountry.id}
          onClose={() => setPopUp(false)}
        />
      )}
    </div>
  );
};

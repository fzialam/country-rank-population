import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const CountrySelection = ({ country, onSelect, onClear, data }) => (
    <div className="mb-3 col-lg-6 d-flex flex-column align-items-center">
        {country ? (
            <img
                src={country.flag}
                alt={country.name}
                height="200"
                width="350"
                className="img-fluid mb-3"
            />
        ) : (
            <div className="bg-light border border-1 mb-3" style={{ height: '200px', width: '350px' }} />
        )}
        <label htmlFor="country" className="form-label text-center">
            Select Country
        </label>
        <ReactSearchAutocomplete
            items={data}
            onSelect={onSelect}
            onClear={onClear}
            fuseOptions={{ keys: ['name'] }}
            resultStringKeyName="name"
            placeholder={'Search Country'}
            className="form-control search-container"
            style={{ backgroundColor: '#333', color: '#fff' }}
        />
    </div>
);
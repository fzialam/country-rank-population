import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function CompareForm() {
    const data = useSelector((state) => state.countries.map(
        country => ({
            id: country.cca2,
            name: country.name.common,
            flag: country.flags.png
        })
    ));

    const dispatch = useDispatch();
    const [countries1, setCountries1] = useState([]);
    const [countries2, setCountries2] = useState([]);
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            // Set both countries lists from Redux state
            setCountries1(data);
            setCountries2(data);
        } else {
            // Fetch data if not available in Redux
            fetch('https://restcountries.com/v3.1/all')
                .then(response => response.json())
                .then(fetchedData => {
                    const formatedData = fetchedData.map(country => ({
                        id: country.cca2,
                        name: country.name.common,
                        flag: country.flags.png
                    }));
                    setCountries1(formatedData);
                    setCountries2(formatedData);
                })
                .catch((error) => console.error('Error fetching countries:', error));
        }
    }, [data]);  // Trigger only when Redux state `data` changes

    // Handle country selection
    const handleSelect1 = (selectedItem) => {
        setSelectedCountry1(selectedItem);
    };

    const handleSelect2 = (selectedItem) => {
        setSelectedCountry2(selectedItem);
    };

    // Filter countries based on selections
    const filteredCountries1 = selectedCountry2
        ? countries1.filter(country => country.id !== selectedCountry2.id)
        : countries1;

    const filteredCountries2 = selectedCountry1
        ? countries2.filter(country => country.id !== selectedCountry1.id)
        : countries2;

    return (
        <div>
            <h1>Compare Form</h1>
            <div className="row">
                {/* Country 1 */}
                <div className="mb-3 col">
                    {selectedCountry1 ? (
                        <img
                            src={selectedCountry1.flag}
                            alt={selectedCountry1.name}
                            height="100"
                            width="200"
                        />
                    ) : (
                        <div
                            className="bg-light border border-1"
                            style={{ height: '100px', width: '200px' }}
                        ></div>
                    )}
                    <label htmlFor="country1" className="form-label">Select Country 1</label>
                    <ReactSearchAutocomplete
                        items={filteredCountries1}
                        onSelect={handleSelect1}
                        fuseOptions={{ keys: ['name'] }}
                        resultStringKeyName="name"
                        placeholder="Search countries"
                        styling={{ height: "40px", borderRadius: "5px", padding: "5px" }}
                    />
                </div>

                {/* Country 2 */}
                <div className="mb-3 col">
                    {selectedCountry2 ? (
                        <img
                            src={selectedCountry2.flag}
                            alt={selectedCountry2.name}
                            height="100"
                            width="200"
                        />
                    ) : (
                        <div
                            className="bg-light border border-1"
                            style={{ height: '100px', width: '200px' }}
                        ></div>
                    )}
                    <label htmlFor="country2" className="form-label">Select Country 2</label>
                    <ReactSearchAutocomplete
                        items={filteredCountries2}
                        onSelect={handleSelect2}
                        fuseOptions={{ keys: ['name'] }}
                        resultStringKeyName="name"
                        placeholder="Search countries"
                        styling={{ height: "40px", borderRadius: "5px", padding: "5px" }}
                    />
                </div>
            </div>

            <div>
                <button className='btn btn-outline-info' type='submit'>Compare</button>
            </div>
        </div>
    );
}

export default CompareForm;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { UrlConstant } from '../../constant/url-constant';
import { useNavigate } from 'react-router-dom';

function CompareForm() {
    const data = useSelector((state) => state.countries.map(
        country => ({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.png
        })
    ));

    const navigate = useNavigate();

    const [countries1, setCountries1] = useState([]);
    const [countries2, setCountries2] = useState([]);
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            setCountries1(data);
            setCountries2(data);
        } else {
            axios.get(UrlConstant.FETCH_COUNTRIES)
                .then(response => {
                    const formatedData = response.data.map(country => ({
                        id: country.cca3,
                        name: country.name.common,
                        flag: country.flags.png
                    }));
                    setCountries1(formatedData);
                    setCountries2(formatedData);
                })
                .catch((error) => console.error('Error fetching countries:', error));
        }
    }, [data]);

    const handleSelect1 = (selectedItem) => {
        setSelectedCountry1(selectedItem);
        console.log(selectedCountry1, selectedCountry2);
    };

    const handleSelect2 = (selectedItem) => {
        setSelectedCountry2(selectedItem);
        console.log(selectedCountry1, selectedCountry2);
    };

    const handleCompare = () => {
        if (selectedCountry1 && selectedCountry2) {
            navigate(selectedCountry1.id + '/n/' + selectedCountry2.id)
        }
        else {
            alert('Choose 2 Country to Compare')
        }
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
            <form onSubmit={handleCompare}>
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
            </form>
        </div>
    );
}

export default CompareForm;

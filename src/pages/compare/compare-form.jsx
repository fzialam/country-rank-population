import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { UrlConstant } from '../../constant/url-constant';
import { useNavigate, useParams } from 'react-router-dom';
import CompareDetail from './compare-detail';

function CompareForm() {
    const data = useSelector((state) => state.countries.map(
        country => ({
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.png
        })
    ));

    const navigate = useNavigate();
    const { param1, param2 } = useParams();

    const [dataMaster, setDataMaster] = useState({
        countries: data,
        filteredCountries1: data,
        filteredCountries2: data,
        submited: false
    })

    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);

    useEffect(() => {
        if (data.length === 0 && (dataMaster.countries.length === 0 || dataMaster.filteredCountries1.length === 0 && dataMaster.filteredCountries2.length === 0)) {
            
            const getLocalstg = JSON.parse(window.localStorage.getItem('countries'));
            if (getLocalstg) {
                const formatedData = getLocalstg.map(country => ({
                    id: country.cca3,
                    name: country.name.common,
                    flag: country.flags.png
                }));

                setDataMaster((x) => ({
                    ...x,
                    countries: formatedData,
                    filteredCountries1: formatedData,
                    filteredCountries2: formatedData,
                }))
            }
            else {
                axios.get(UrlConstant.FETCH_COUNTRIES)
                    .then(response => {
                        const formatedData = response.data.map(country => ({
                            id: country.cca3,
                            name: country.name.common,
                            flag: country.flags.png
                        }));

                        setDataMaster((x) => ({
                            ...x,
                            countries: formatedData,
                            filteredCountries1: formatedData,
                            filteredCountries2: formatedData,
                        }))
                    })
                    .catch((error) => console.error('Error fetching countries:', error));
            }
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



    useEffect(() => {
        setDataMaster((x) => ({
            ...x,
            filteredCountries2:
                selectedCountry1
                    ? dataMaster.countries.filter((country) => country.id !== selectedCountry1.id)
                    : dataMaster.countries
        }));
    }, [selectedCountry1]);

    useEffect(() => {
        setDataMaster((x) => ({
            ...x,
            filteredCountries1:
                selectedCountry2
                    ? dataMaster.countries.filter((country) => country.id !== selectedCountry2.id)
                    : dataMaster.countries
        }));
    }, [selectedCountry2]);


    const handleClear1 = () => {
        setSelectedCountry1(null);
        setDataMaster((x) => ({
            ...x,
            filteredCountries2: dataMaster.countries
        }));
    };

    const handleClear2 = () => {
        setSelectedCountry2(null);
        setDataMaster((x) => ({
            ...x,
            filteredCountries1: dataMaster.countries
        }));
    };

    const handleCompare = (e) => {
        e.preventDefault();
        if (selectedCountry1 && selectedCountry2) {
            setDataMaster((x) => ({
                ...x,
                submited: true
            }))
            navigate(selectedCountry1.id + '/n/' + selectedCountry2.id)
        }
        else {
            alert('Choose 2 Country to Compare')
        }
    };

    return (
        <div>
            <h1>Compare Form</h1>
            <form onSubmit={handleCompare}>
                <div className="row">

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
                            items={dataMaster.filteredCountries1}
                            onSelect={handleSelect1}
                            onClear={handleClear1}
                            fuseOptions={{ keys: ['name'] }}
                            resultStringKeyName="name"
                            placeholder="Search countries"
                            styling={{ height: "40px", borderRadius: "5px", padding: "5px" }}
                        />
                    </div>

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
                            items={dataMaster.filteredCountries2}
                            onSelect={handleSelect2}
                            onClear={handleClear2}
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
            {dataMaster.submite}
            {
                dataMaster.submited || (param1 && param2) &&
                <div className="mt-5">
                    <CompareDetail />
                </div>
            }
        </div>
    );
}

export default CompareForm;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { UrlConstant } from '../../constant/url-constant';
import { useNavigate, useParams } from 'react-router-dom';
import CompareDetail from './compare-detail';

import '../../assets/css/compare-form.css'
import { CountrySelection } from '../../components/country-selection';

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
        <div className="container mt-4">
            <div id="form" className="">
                <h1 className="text-center mb-4">Compare Form</h1>
                <form onSubmit={handleCompare}>
                    <div className="row g-3">
                        <CountrySelection country={selectedCountry1} onSelect={handleSelect1} onClear={handleClear1} data={dataMaster.filteredCountries1} />
                        <CountrySelection country={selectedCountry2} onSelect={handleSelect2} onClear={handleClear2} data={dataMaster.filteredCountries2} />
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-outline-primary btn-lg" type="submit">Compare</button>
                    </div>
                </form>
            </div>

            {dataMaster.submited || (param1 && param2) && (
                <div className="mt-5 text-center">
                    <CompareDetail />
                </div>
            )}
        </div>
    );

}

export default CompareForm;

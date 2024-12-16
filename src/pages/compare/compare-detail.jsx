import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryByCCA3 } from "../../store/country";

function CompareDetail() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);

    const { param1, param2 } = useParams();
    const [request, setRequest] = useState([param1, param2]);
    const [response, setResponse] = useState([]);

    const [countries, setCountries] = useState({
        cntry1: response.find((x) => x.cca3 === param1),
        cntry2: response.find((x) => x.cca3 === param2)
    })

    useEffect(() => {
        setRequest([param1, param2]);
        console.log(request);

    }, [param1, param2]);

    useEffect(() => {
        if (request) {
            setResponse(getCountryByCCA3(request, dispatch));
            setCountries({
                cntry1: response.find((x) => x.cca3 === param1),
                cntry2: response.find((x) => x.cca3 === param2)
            })
            console.log(countries);

        }
        dispatch({
            type: 'LOADING',
            loading: false,
        });
    }, [request])


    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            <div>
                <h1>
                    UHY
                    {/* {
                        countries.cntry1.cca3
                    }
                    {
                        countries.cntry2.cca3
                    } */}
                </h1>
                <h1>{request} iki request</h1>
                <h1>Compare Detail</h1>
                <h1>{param1}</h1>
                <h1>{param2}</h1>
            </div>
        )
    );
}

export default CompareDetail;
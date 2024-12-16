import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate } from 'react-router-dom'
import openStreet from '../assets/img/map-svgrepo-com.svg'
import googleMap from '../assets/img/map-pin-svgrepo-com.svg'

export const RowTable = (props) => {
    const navigate = useNavigate();
    const handleClicked = (param) => {
        console.log(param)
        // navigate(`detail/${param}`)
    };

    return (
        <>
            {
                props.data.map((country, index) => (
                    <tr className="col-2 my-2" key={country.cca3}>
                        <td>
                            <img src={country.flags.svg} height={'100'} width={'150'} alt={country.name.common + '.png'} />
                        </td>
                        <td>
                            <a onClick={() => {
                                handleClicked(country.cca3)
                            }}
                                style={{
                                    cursor: 'pointer'
                                }}>
                                {country.name.common}
                            </a>
                        </td>
                        <td>
                            {country.population.toLocaleString('id-ID')}
                        </td>
                        <td>
                            {country.area.toLocaleString('id-ID')}
                        </td>
                        <td>
                            {country.region}
                        </td>
                        <td>
                            <a href={country.maps.googleMaps}
                            className="mx-1"
                            target={"_blank"}
                            style={{cursor: 'pointer'}}>
                                <img src={googleMap} height={"20"} width={'20'} alt="" />
                            </a>
                            <a href={country.maps.openStreetMaps}
                            className="mx-1"
                            target={"_blank"}
                            style={{cursor: 'pointer'}}>
                                <img src={openStreet} height={"20"} width={'20'} alt="" />
                            </a>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

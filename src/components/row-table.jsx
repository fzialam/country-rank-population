import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import openStreet from "../assets/img/openstreetmap-svgrepo-com.svg";
import googleMap from "../assets/img/google-maps-platform-svgrepo-com.svg";
import { PopupDetailComponent } from "./pop-up-detail-component";

export const RowTable = (props) => {
  const [popUp, setPopUp] = useState(false);
  const [clicked, setClicked] = useState();
  
  const formatNumber = (num) => {
    if (num >= 1000000000) { 
      return (num / 1000000000).toFixed(2) + ' B';
    }
    if (num >= 1000000) { 
      return (num / 1000000).toFixed(2) + ' M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + ' K';
    }
    return num;
  }

  return (
    <>
      {props.data.map((country, index) => (
        <tr className="col-2 my-2" key={country.cca3}>
          <td>
            <img
              src={country.flags.svg}
              height={"100"}
              width={"150"}
              alt={country.name.common + ".png"}
            />
          </td>
          <td>
            <a
              className="fw-medium"
              onClick={() => {
                setClicked(country.cca3);
                setPopUp(true);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {country.name.common}
            </a>
          </td>
          <td className="fw-medium">
            {formatNumber(country.population).toLocaleString("id-ID")}
          </td>
          <td className="fw-medium">{formatNumber(country.area).toLocaleString("id-ID")}</td>
          <td className="fw-medium">{country.region}</td>
          <td>
            <a
              href={country.maps.googleMaps}
              className="mx-1"
              target={"_blank"}
              style={{ cursor: "pointer" }}
            >
              <img src={googleMap} height={"20"} width={"20"} alt="" />
            </a>
            <a
              href={country.maps.openStreetMaps}
              className="mx-1"
              target={"_blank"}
              style={{ cursor: "pointer" }}
            >
              <img src={openStreet} height={"20"} width={"20"} alt="" />
            </a>
          </td>
        </tr>
      ))}
      {popUp && (
        <PopupDetailComponent data={clicked} onClose={() => setPopUp(false)} />
      )}
    </>
  );
};

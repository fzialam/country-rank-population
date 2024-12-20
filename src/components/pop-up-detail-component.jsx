import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryForDetailByCCA3 } from "../store/country";
import openStreet from "../assets/img/openstreetmap-svgrepo-com.svg";
import googleMap from "../assets/img/google-maps-platform-svgrepo-com.svg";

export const PopupDetailComponent = ({ data, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const country = getCountryForDetailByCCA3(data, dispatch);

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => onClose(), 300);
    }
  }, [isClosing, onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsClosing(true);
      setTimeout(() => onClose(), 300);
    }
  };

  return (
    <div
      className={`modal show d-block ${isClosing ? "closing" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="modal-dialog modal-lg"
        ref={modalRef}
        style={{
          maxWidth: "90%",
          width: "1000px",
          transform: "scale(0.9)",
          opacity: 1,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div className="modal-content w-100">
          <div className="modal-header">
            <h5 className="modal-title text-primary fw-bolder">Detail Data</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {country.map((country) => (
              <div className=" my-1 shadow-sm" key={country.cca3}>
                <div className="row text-center">
                  <h3 className="fw-bold text-body">
                    {country.name.common} ({country.flag})
                  </h3>
                </div>
                <div className="row g-3 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={country.flags.svg}
                      className="img-fluid rounded shadow"
                      alt={country.name.common + ".png"}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="row text-start">
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Capital : </label>{" "}
                        <span className="fw-normal">{country.capital || "-"}</span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Region : </label>{" "}
                        <span className="fw-normal">{country.region}</span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Sub Region : </label>{" "}
                        <span className="fw-normal">{country.subregion}</span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Languages : </label>{" "}
                        <span className="fw-normal">
                          {country.languages
                            ? Object.values(country.languages).join(", ")
                            : "-"}
                        </span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Currency : </label>{" "}
                        <span className="fw-normal">
                          {country.currencies
                            ? `${Object.keys(country.currencies)[0]} - ${
                                Object.values(country.currencies)[0].name
                              } (${
                                Object.values(country.currencies)[0].symbol
                              })`
                            : "-"}
                        </span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Population : </label>{" "}
                        <span className="fw-normal">
                          {country.population.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Area : </label>{" "}
                        <span className="fw-normal">{country.area.toLocaleString("id-ID")} km²</span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Lat & Long : </label>{" "}
                        <span className="fw-normal">{country.latlng.join(", ")}</span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Timezone : </label>{" "}
                        <span className="fw-normal">{country.timezones.join("; ")}</span>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="fw-semibold">Maps : </label>{" "}
                        <a
                          href={country.maps.googleMaps}
                          className="mx-1"
                          target={"_blank"}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={googleMap}
                            height={"30"}
                            width={"30"}
                            alt=""
                          />
                        </a>
                        <a
                          href={country.maps.openStreetMaps}
                          className="mx-1"
                          target={"_blank"}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={openStreet}
                            height={"30"}
                            width={"30"}
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryByCCA3 } from "../../store/country";
import { DetailCompareComponent } from "../../components/detail-compare-component";
import { ReducerConstant } from "../../constant/reducer-constant";
import { DetailCompareFlagComponent } from "../../components/detail-compare-flag-component";
import { DetailCompareMapsComponent } from "../../components/detail-compare maps";

export const CompareDetail = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const comparedData = useSelector((state) => state.comparedData);

  const { param1, param2 } = useParams();
  const [request, setRequest] = useState([param1, param2]);

  const [countries, setCountries] = useState({
    cntry1: comparedData.find((x) => x.cca3 === param1),
    cntry2: comparedData.find((x) => x.cca3 === param2),
  });

  useEffect(() => {
    setRequest([param1, param2]);
  }, [param1, param2]);

  useEffect(() => {
    dispatch({
      type: ReducerConstant.LOADING,
      loading: true,
    });
    if (request) {
      getCountryByCCA3(request, dispatch);
    }
  }, [request, dispatch]);

  useEffect(() => {
    if (comparedData.length > 0) {
      setCountries({
        cntry1: comparedData.find((x) => x.cca3 === param1),
        cntry2: comparedData.find((x) => x.cca3 === param2),
      });

      dispatch({
        type: ReducerConstant.LOADING,
        loading: false,
      });
    }
  }, [comparedData, param1, param2, dispatch]);

  return loading &&
    countries.cntry1 == undefined &&
    countries.cntry2 == undefined ? (
    <p>Loading...</p>
  ) : (
    <div className="container mt-5 rounded-4 bg-warning">
      <table className="table table-borderless">
        <thead>
          <tr className="text-center fw-bolder h4 border border-bottom-100">
            <td className="mt-1">{countries.cntry1.name.common}</td>
            <td className="mt-1">Comparasion</td>
            <td className="mt-1">{countries.cntry2.name.common}</td>
          </tr>
        </thead>
        <tbody>
          <DetailCompareFlagComponent
            detail={"Flag Country"}
            countryA={countries.cntry1}
            countryB={countries.cntry2}
          />
          <DetailCompareComponent
            detail={"Region"}
            countryA={
              countries.cntry1.region == undefined
                ? "-"
                : countries.cntry1.region
            }
            countryB={
              countries.cntry2.region == undefined
                ? "-"
                : countries.cntry2.region
            }
          />
          <DetailCompareComponent
            detail={"Sub Region"}
            countryA={
              countries.cntry1.subregion == undefined
                ? "-"
                : countries.cntry1.subregion
            }
            countryB={
              countries.cntry2.subregion == undefined
                ? "-"
                : countries.cntry2.subregion
            }
          />
          <DetailCompareComponent
            detail={"The Nation's Capital"}
            countryA={
              countries.cntry1.capital == undefined
                ? "-"
                : countries.cntry1.capital[0]
            }
            countryB={
              countries.cntry2.capital == undefined
                ? "-"
                : countries.cntry2.capital[0]
            }
          />
          <DetailCompareComponent
            detail={"Population"}
            countryA={countries.cntry1.population.toLocaleString("id-ID")}
            countryB={countries.cntry2.population.toLocaleString("id-ID")}
          />
          <DetailCompareComponent
            detail={"Area of the State (KM²)"}
            countryA={countries.cntry1.area.toLocaleString("id-ID")}
            countryB={countries.cntry2.area.toLocaleString("id-ID")}
          />
          <DetailCompareComponent
            detail={"Official Language"}
            countryA={
              countries.cntry1.languages
                ? Object.values(countries.cntry1.languages).length > 1
                  ? Object.values(countries.cntry1.languages).join(", ")
                  : Object.values(countries.cntry1.languages)
                : "-"
            }
            countryB={
              countries.cntry2.languages
                ? Object.values(countries.cntry2.languages).length > 1
                  ? Object.values(countries.cntry2.languages).join(", ")
                  : Object.values(countries.cntry2.languages)
                : "-"
            }
          />
          <DetailCompareComponent
            detail={"Currency"}
            countryA={
              countries.cntry1.currencies
                ? `(${Object.values(countries.cntry1.currencies)[0].symbol}) ` +
                  Object.values(countries.cntry1.currencies)[0].name
                : "-"
            }
            countryB={
              countries.cntry2.currencies
                ? `(${Object.values(countries.cntry2.currencies)[0].symbol}) ` +
                  Object.values(countries.cntry2.currencies)[0].name
                : "-"
            }
          />
          <DetailCompareMapsComponent
            detail={"Maps"}
            countryA={
              countries.cntry1
            }
            countryB={
              countries.cntry2
            }
          />
        </tbody>
      </table>
    </div>
  );
};

import axios from "axios";
import { UrlConstant } from "../constant/url-constant";
import { ReducerConstant } from "../constant/reducer-constant";

//#region  Fetch API
export const fetchCountries = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ReducerConstant.LOADING,
        loading: true,
      });

      const response = await axios.get(UrlConstant.FETCH_COUNTRIES);

      const formattedData = response.data.sort((a, b) => {
        if (a.population < b.population)
          return 1;
        if (a.population > b.population) return -1;
        return 0;
      });

      dispatch({
        type: ReducerConstant.INIT,
        countries: formattedData,
      });

      window.localStorage.setItem("countries", JSON.stringify(formattedData));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
};

export async function getCountryForCompareByCCA3(codes, dispatch) {
  dispatch({
    type: ReducerConstant.LOADING,
    loading: true,
  });

  if (!codes) {
    return alert("Invalid Request");
  }
  const getLocalstg = JSON.parse(window.localStorage.getItem("countries"));
  console.log("getLocalstg", getLocalstg);
  if (getLocalstg) {
    console.log("getLocalstg", getLocalstg);

    const comparedData = getLocalstg.filter((x) => codes.includes(x.cca3));

    dispatch({
      type: ReducerConstant.COMPARE,
      comparedData,
    });
  } else {
    console.log("FETCHING", codes);
    await axios
      .get(UrlConstant.FETCH_COUNTRIES_BY_CODE, {
        params: {
          codes: codes.join(","),
        },
      })
      .then((response) => {
        if (response.data) {
          console.log("FETCH", response.data);
          const comparedData = response.data;

          dispatch({
            type: ReducerConstant.COMPARE,
            comparedData,
          });
        } else {
          return alert("Data not Found");
        }
      })
      .catch((e) => {
        console.error("Error Get Country By CCA3", e);
      });
  }
}

export function getCountryForDetailByCCA3(codes, dispatch) {
  if (!codes) {
    return alert("Invalid Request");
  }
  console.log('CODES',codes);
  
  
  const getLocalstg = JSON.parse(window.localStorage.getItem("countries"));
  if (getLocalstg) {
    console.log('getLocalstg',getLocalstg.filter((x) => codes.includes(x.cca3)));
    return getLocalstg.filter((x) => codes.includes(x.cca3));
  } else {
    console.log("FETCHING", codes);
    axios
      .get(UrlConstant.FETCH_COUNTRIES_BY_CODE, {
        params: {
          codes: codes.join(","),
        },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return alert("Data not Found");
        }
      })
      .catch((e) => {
        console.error("Error Get Country By CCA3", e);
      });
  }
}
//#endregion

export function checkGetData(data, dispatch) {
  if (data.length === 0) {
    const getLocalstg = JSON.parse(window.localStorage.getItem("countries"));

    if (!getLocalstg) {
      dispatch(fetchCountries());
    } else {
      dispatch({
        type: ReducerConstant.INIT,
        countries: getLocalstg,
      });
    }
  }
}

import axios from "axios";
import { UrlConstant } from "../constant/url-constant";
import { CommonConstant } from "../constant/common-constant";

export const fetchArticles = () => {
  return (dispatch) => {
    dispatch({
      type: ReducerConstant.LOADING,
      loading: true,
    });
    axios
      .get(UrlConstant.FETCH_ARTICLE, {
        params: {
          q: CommonConstant.PEACE,
          "api-key": process.env.REACT_APP_NYT_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  };
};

import axios from "axios";
import { UrlConstant } from "../constant/url-constant";
import { CommonConstant } from "../constant/common-constant";
import { EnviConfig } from "../enviConfig";
import { ReducerConstant } from "../constant/reducer-constant";

export const fetchArticles = () => {
  return async (dispatch) => {
    
    try {

      const fetch = await axios.get(UrlConstant.FETCH_ARTICLE, {
        params: {
          q: CommonConstant.PEACE,
          "api-key": EnviConfig.apiKeyNyi,
        },
      });
      const response = fetch.data.response;
      
      dispatch({
        type: ReducerConstant.ARTICLES,
        articles: response.docs.slice(0, 12),
      });
    } catch (error) {
      console.error("Error fetching Articles", error);
    }
  };
};
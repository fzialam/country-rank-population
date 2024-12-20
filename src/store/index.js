import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk";
import { ReducerConstant } from "../constant/reducer-constant";

const initialState = {
  search: "",
  countries: [],
  loading: true,
  comparedData: [],
  articles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ReducerConstant.INIT:
      return { ...state, countries: action.countries };
    case ReducerConstant.SEARCH:
      return { ...state, search: action.search };
    case ReducerConstant.LOADING:
      console.log("REDUCER", action.loading);
      return { ...state, loading: action.loading };
    case ReducerConstant.COMPARE:
      return { ...state, comparedData: action.comparedData };
    case ReducerConstant.ARTICLES:
      console.log("REDUCER ARTICLES", action.articles);
      return { ...state, articles: action.articles };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;

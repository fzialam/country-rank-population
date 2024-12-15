import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger';
import { thunk } from 'redux-thunk';

const initialState = {
    search: '',
    countries: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'INIT':
            return {...state, countries: action.countries}
        case 'SEARCH':
            return { ...state, search: action.search }
        case 'LOADING':
            return { ...state, loading: action.loading }
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
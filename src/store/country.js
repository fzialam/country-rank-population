import axios from 'axios';
import { UrlConstant } from '../constant/url-constant';

export const fetchCountries = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'LOADING',
                loading: true,
            });

            const response = await axios.get(UrlConstant.FETCH_COUNTRIES);

            const formattedData = response.data.sort((a, b) => {
                if (a.cca3 < b.cca3) return -1;
                if (a.cca3 > b.cca3) return 1;
                return 0;
            });

            dispatch({
                type: 'INIT',
                countries: formattedData,
            });

            window.localStorage.setItem('countries', JSON.stringify(formattedData));

            // dispatch({
            //     type: 'LOADING',
            //     loading: false,
            // });
        } catch (error) {
            console.error('Error fetching countries:', error);

        }
    };
};

export function checkGetData(data, dispatch) {
    if (data.length === 0) {
        const getLocalstg = JSON.parse(window.localStorage.getItem('countries'));

        if (!getLocalstg) {
            dispatch(fetchCountries());
        }
        else {
            dispatch({
                type: 'INIT',
                countries: getLocalstg
            })
        }
    }
}

export function checkGetDataForList(dispatch) {
    const localData = JSON.parse(window.localStorage.getItem('countries'));

    if (!localData) {
        dispatch(fetchCountries());
    } else {
        dispatch({
            type: 'INIT',
            countries: localData,
        });
    }
}

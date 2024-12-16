import axios from 'axios';
import { UrlConstant } from '../constant/url-constant';

//#region  Fetch API
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
        } catch (error) {
            console.error('Error fetching countries:', error);

        }
    };
};

export function getCountryByCCA3(req, dispatch) {
    dispatch({
        type: 'LOADING',
        loading: true,
    });

    if (!req) {
        return alert('Invalid Request')
    }

    const getLocalstg = JSON.parse(window.localStorage.getItem('countries'));
    if (getLocalstg) {
        console.log('LOCAL',getLocalstg.filter((x) => req.includes(x.cca3)));
        return getLocalstg.filter((x) => req.includes(x.cca3))
    }
    else {
            axios.get(UrlConstant.FETCH_COUNTRIES_BY_CODE, {
                params: {
                    codes: req
                }
            })
            .then((response) => {
                if (response.data){
                    console.log('FETCH', response.data);
                    
                    return response.data;
                }
                else {
                    return alert('Data not Found');
                }
            })
            .catch((e)=> {
                console.error('Error Get Country By CCA3', e);
            })
    }

}
//#endregion

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

import { 
    apiGetListProduct,
} from "../api";
import {
    PRODUCT_LIST_DATA,
    PRODUCT_LIST,
} from "./types";

export const action_getProductList = (data) => {
    return (dispatch) => {
        apiGetListProduct(data)
        .then(result => {
            dispatch({ type: PRODUCT_LIST_DATA, payload: result });
            setTimeout(() => {
                dispatch({ type: PRODUCT_LIST });
            }, 500);
        })
        .catch((error) =>{
            dispatch({ type: PRODUCT_LIST_DATA, payload: error.errors ? error.errors : {message: error.message, status : 'error' } })
            setTimeout(() => {
                dispatch({ type: PRODUCT_LIST });
            }, 500);
        })
    }
}
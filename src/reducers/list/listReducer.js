import { 
    PRODUCT_LIST,
    PRODUCT_LIST_DATA,
    
} from '../../actions/types';

const INITIAL_STATE = {
    listProduct: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_LIST:
            return {...state, ...INITIAL_STATE, listProduct: null};
        case PRODUCT_LIST_DATA:
            return {...state, ...INITIAL_STATE, listProduct: action.payload};
        default:
            return state;
    }
};

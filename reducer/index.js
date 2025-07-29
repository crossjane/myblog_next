import { auth, authReducer } from "@/features/auth/slice";

const { combineReducers } = require("@reduxjs/toolkit");
const { HYDRATE } = require("next-redux-wrapper");

const rootReducer = combineReducers({
    [auth]: authReducer,
});

const reducer = (state, action) => {
    switch(action.type) {
        case HYDRATE: return {
            ...state,
            ...action.payload,
        }

        default:
            return rootReducer(state, action);
    }
};

export default reducer;

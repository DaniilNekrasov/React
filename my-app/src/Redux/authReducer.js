import { authAPI } from "../API/API";

const SET_USER_DATA = "SET_USER_DATA";


let initialState = {
    userId: null,
    email: '',
    login: "",
    isAuth: false,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (Id, email, login) => ({ type: SET_USER_DATA, data:  {Id, email, login} })

export const getAuthUserData = () => (dispatch) => {
    authAPI.me().
    then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login))
        } 
    }); 
}

export default authReducer;
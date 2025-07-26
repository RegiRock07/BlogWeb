import {createSlice} from '@reduxjs/toolkit'

//remember in Redux we dont have to spread our data ... its automatically handled
//here we are tracking authentication using state... whether the user is authenticated or not

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;


import {createSlice} from "@reduxjs/toolkit"

export const Token = createSlice({
    name: "Token",
    initialState: {
        token: ""
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const {setToken} = Token.actions

export default Token.reducer
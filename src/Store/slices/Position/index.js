import {createSlice} from "@reduxjs/toolkit"

export const positionSlice = createSlice({
    name: "position",
    initialState: {
        position:{
            lat: 0.3469352857336372,
            lng: -78.11878167074865
        }
    },
    reducers: {
        setPosition: (state, action) => {
            state.position = action.payload
        }
    }
})

export const {setPosition} = positionSlice.actions

export default positionSlice.reducer

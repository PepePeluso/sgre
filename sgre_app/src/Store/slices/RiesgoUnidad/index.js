import {createSlice} from "@reduxjs/toolkit"

export const RiesgosUnidad = createSlice({
    name: "Riesgos unidad responsable",
    initialState: {
        riesgosUnidad:[]
    },
    reducers: {
        setRiesgosUnidad: (state, action) => {
            state.riesgosUnidad = action.payload
        }
    }
})

export const {setRiesgosUnidad} = RiesgosUnidad.actions

export default RiesgosUnidad.reducer
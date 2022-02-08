import {createSlice} from "@reduxjs/toolkit"

export const RiesgosUnidad = createSlice({
    name: "Riesgos unidad responsable",
    initialState: {
        riesgosUnidad:[],
        unidad_id:0
    },
    reducers: {
        setRiesgosUnidad: (state, action) => {
            state.riesgosUnidad = action.payload
        },
        setUnidadID: (state, action) => {
            state.unidad_id = action.payload
        }
    }
})

export const {setRiesgosUnidad, setUnidadID} = RiesgosUnidad.actions

export default RiesgosUnidad.reducer
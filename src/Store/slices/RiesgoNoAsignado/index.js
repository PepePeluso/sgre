import {createSlice} from "@reduxjs/toolkit"

export const RiesgosNoAsignados = createSlice({
    name: "Riesgos no asignados",
    initialState: {
        riesgosNoAsignados:[]
    },
    reducers: {
        setRiesgosNoAsignados: (state, action) => {
            state.riesgosNoAsignados = action.payload
        }
    }
})

export const {setRiesgosNoAsignados} = RiesgosNoAsignados.actions

export default RiesgosNoAsignados.reducer
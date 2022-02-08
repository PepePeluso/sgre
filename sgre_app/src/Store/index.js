import {configureStore} from "@reduxjs/toolkit"
import position from "./slices/Position/index"
import RiesgoNoAsignado from "./slices/RiesgoNoAsignado"
import RiesgoUnidad from "./slices/RiesgoUnidad"
import Token from "./slices/Token"

export default configureStore({
    reducer: {
        position,
        RiesgoNoAsignado,
        RiesgoUnidad,
        Token
    }
})
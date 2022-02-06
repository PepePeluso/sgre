import {configureStore} from "@reduxjs/toolkit"
import position from "./slices/Position/index"
import RiesgoNoAsignado from "./slices/RiesgoNoAsignado"

export default configureStore({
    reducer: {
        position,
        RiesgoNoAsignado
    }
})
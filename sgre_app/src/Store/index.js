import {configureStore} from "@reduxjs/toolkit"
import position from "./slices/Position/index"

export default configureStore({
    reducer: {
        position
    }
})
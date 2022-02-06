import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom"
import Navbar from "./navbar"

const AsignarRiesgo = () => {
    const {numRiesgo} = useLocation()
    const riesgo = useSelector(state => state.RiesgoNoAsignado.riesgosNoAsignados[numRiesgo])

    
}

export default AsignarRiesgo
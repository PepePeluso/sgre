import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux'
import {setPosition as setPositionRedux} from "../../Store/slices/Position/index"

const containerStyle = {
    "width": "100%",
    height: '50vh'
};

const center = {
    lat: 0.3469352857336372,
    lng: -78.11878167074865
};

function MyComponent() {
    const dispatch = useDispatch()

    const [position, setPosition] = useState(useSelector(state => state.position.position))

    useEffect(() => {
        dispatch(setPositionRedux(position))
    },[position])

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBp3nkTj5Ox19jsyDLNTRFDzHHGSnh6Dtg"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={ev => {
                    setPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
                }}
            >
                <Marker
                    position={position}
                />
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)
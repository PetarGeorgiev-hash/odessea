import { MapContainer, TileLayer } from "react-leaflet"
import useLocation from "../../hooks/useLocation"
import "leaflet/dist/leaflet.css"
import RecenterMap from "./partial/RecenterMap"
import LocationMarker from "./partial/LocationMaker"

export default function Map(){
    const {location, isLoading, error} = useLocation()
    if (isLoading) return <div>Loading...</div>
    if (error != null) return <div>Error: {error}</div>
    
    return <MapContainer style={{height: '100vh'}} center={[location.latitude, location.longitude]} zoom={5}>
          <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
            <RecenterMap lat={location.latitude} lng={location.longitude} />   
            <LocationMarker />
    </MapContainer>
}
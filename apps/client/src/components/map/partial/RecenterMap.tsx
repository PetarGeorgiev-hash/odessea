import { useEffect } from "react";
import { useMap } from "react-leaflet"

export default function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng, map]);

    return null;
}
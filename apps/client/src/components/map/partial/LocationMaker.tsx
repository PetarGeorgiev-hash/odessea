import { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import type { LatLngLiteral } from "leaflet";

export default function LocationMarker() {
    const [position, setPosition] = useState<LatLngLiteral | null>(null);

    const map = useMap();

    useEffect(() => {
        map.locate({
            setView: true,
            maxZoom: 13,
        });

        map.on("locationfound", (e) => {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });

        return () => {
            map.off("locationfound");
        };
    }, [map]);

    if (position === null) return null;

    return (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}
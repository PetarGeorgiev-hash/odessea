import { useEffect, useState } from "react";

type Location = {
    longitude: number;
    latitude: number;   
}


export default function useLocation() : {location: Location, isLoading :boolean, error: string | null} {
    const [location, setLocation] = useState<Location>({longitude: 0, latitude: 0});
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    console.log(location)

    useEffect(() => {
        const onSuccess = (e) => {
            setLoading(false)
            setError(null)
            setLocation({
                longitude: e.coords.longitude,
                latitude: e.coords.latitude
            })
        }
        const onError = (error) => {
            setLoading(false)
            setError(error.message)
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])

    return {
        location,
        isLoading,
        error
    }
}
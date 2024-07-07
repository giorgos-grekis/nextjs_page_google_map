import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";

export default function Home() {

  /* In https://console.cloud.google.com/google/maps-apis/api-list need to enable the following api's
    - Directions API
    - Geocoding API
    - Maps JavaScript API
    - Places API
  */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  })

  if (!isLoaded) return <div>Loading...</div>
  return <Map />;
}

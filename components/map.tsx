import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

// center can cause some issues where, every time the component re-render, <GoogleMaps /> it things this is actually a new set of coordinates so every time will the component re-rendes the <GoogleMaps /> reset the center values to init values

export default function Map() {

  const [office, setOffice] = useState<LatLngLiteral>()

  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "9c34d1df61f5a2ad",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  // this useCallback function will receive an instance of the map and then it's going set the map to the ref (mapRef) 
  const onLoad = useCallback(map => (mapRef.current = map), [])

  /* 
  to create a custom map go to 
  -> https://console.cloud.google.com/google/maps-apis/home
  -> Map Styles
  -> Create style
  
  when create the new map style go to 
   -> https://console.cloud.google.com/google/maps-apis/home
   -> Map Management

   When create th Map id add the id to <GoogleMaps /> options
  */
  return (
    <div className="container">
      <div className="controls">
        <h1>Commute</h1>
        <Places setOffice={(position) => {
            setOffice(() => position);
            mapRef.current?.panTo(position)
        }}/>
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};

const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

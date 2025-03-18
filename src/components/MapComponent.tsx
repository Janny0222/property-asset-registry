"use client";
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useMapStore } from "@/stores/mapStore";
import { Loader } from "@googlemaps/js-api-loader"

interface MapHideProps {
  mapHide: boolean
  setMapHide: (mapHide: boolean) => void
}

const mapContainerStyle = {
  width: "100%",
  height: "370px",
};

const center = {
  lat: 14.594760002416178,
  lng: 120.98441648808004,
};
export default function MapComponent({ mapHide, setMapHide} : MapHideProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [map, setMap] = React.useState(null)
    const {mapLocation, setMapLocation } = useMapStore()

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
        setLocation(newLocation);
        const mapLink = `https://www.google.com/maps?q=${newLocation.lat},${newLocation.lng}`;
        setMapLocation(mapLink)
      }
  };
  const handleMapHide = () => {
    setMapHide(false)
  }
  // const onLoad = React.useCallback(function callback(map: any) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])
  return (
  <>
      {mapHide &&
        <div className="z-50 absolute top-20 w-full">
          <div>
            <button onClick={handleMapHide} className="absolute z-50 left-1 border rounded-full text-black border-black bg-white flex justify-center items-center mt-2 p-1">close</button>
          </div>
          <LoadScript googleMapsApiKey={`AIzaSyDvxabyiH5oR_H6_AmSIcnmFPrI5AdKVhg`}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              // onLoad={onLoad}
              onClick={handleMapClick}
            >
              {location && <Marker position={location} />}
          </GoogleMap>
          </LoadScript>
        </div>
      }
    </>
  );
}

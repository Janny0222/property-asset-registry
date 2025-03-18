import React, { useState, useRef, useEffect } from "react";
import { AdvancedMarker, APIProvider, Map, MapMouseEvent, useMap } from "@vis.gl/react-google-maps";
import { useMapStore } from "@/stores/mapStore";

const center = {
  lat: 14.59476,
  lng: 120.98442,
};

interface MapHideProps {
  mapHide: boolean
  setMapHide: (mapHide: boolean) => void
}

const MapController = ({ selectedLocation }: { selectedLocation: { lat: number; lng: number } | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedLocation) return;
    map.setCenter(selectedLocation);
    map.setZoom(15);
  }, [map, selectedLocation]);

  return null;
};

const MapsComponent = ({ mapHide, setMapHide } : MapHideProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { setMapLocation } = useMapStore()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof google === "undefined" || !google.maps || !google.maps.places) {
        console.warn("Google Maps API is still loading...");
        return;
      }

      if (!inputRef.current || autocompleteRef.current) {
        clearInterval(interval);
        return;
      }

      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, { types: ["geocode"] });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place?.geometry?.location) return;

        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        
        setSelectedLocation(newLocation);
        const mapLink = `https://www.google.com/maps?q=${newLocation?.lat},${newLocation?.lng}`;
        setMapLocation(mapLink)
      });

      clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  const handleMapHide = () => {
    setMapHide(false)
  }
  const handleMapClick = (event: MapMouseEvent) => {
    if (!event.detail?.latLng) return;
      const newLocation = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
        
        setSelectedLocation(newLocation);
        const mapLink = `https://www.google.com/maps?q=${newLocation?.lat},${newLocation?.lng}`;
        setMapLocation(mapLink)
  };
  
  return (
    <>
      {mapHide && 
        <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}`} libraries={["places"]}>
      <div className="absolute z-50 top-20 w-full ">
        <div>
          <button onClick={handleMapHide} className="absolute z-50 right-1 border rounded-full text-black border-black bg-white flex justify-center items-center mt-2 p-1">close</button>
        </div>
        <div className="p-4 inset-0 z-50 absolute ">
          <input ref={inputRef} type="text" placeholder="Search location..." className="text-black w-4/6 bg-opacity-70 bg-white p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full h-[500px]">
          <Map mapId="1bcf506c02d8f83cs" defaultCenter={center} defaultZoom={10} gestureHandling="greedy" disableDefaultUI onClick={handleMapClick}>
            <MapController selectedLocation={selectedLocation} />
            {selectedLocation && <AdvancedMarker position={selectedLocation} clickable />}
          </Map>
        </div>
      </div>
      {selectedLocation && (
        <p className="text-center mt-2">
          Selected Location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
        </p>
      )}
        </APIProvider>
      }
    </>
  );
};

export default MapsComponent;

import Map from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

function MainComponentNew({ registered }: { registered: boolean }) {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 45.5019, longitude: -73.5674 });
  const [userTrackingDenied, setUserTrackingDenied] = useState<boolean>(true);
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0,
  });

  const mapRef = useRef<MapRef | null>(null);
  const geoLocateRef = useRef<mapboxgl.GeolocateControl | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });

      setUserTrackingDenied(false);
    });
  }, []);

  useEffect(() => {
    geoLocateRef.current = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    mapRef.current?.addControl(geoLocateRef.current);
  }, [mapRef.current]);

  useEffect(() => {
    if (mapRef.current) {
      if (registered) {
        if (!userTrackingDenied) {
          geoLocateRef.current?.trigger();
        } else {
          mapRef.current.getMap().flyTo({
            zoom: 12,
            center: [userLocation.longitude, userLocation.latitude],
            duration: 4000, // 2 seconds
          });
        }
      }
    }
  }, [registered, userTrackingDenied, userLocation]);

  return (
    <div className="w-full h-full">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle={"mapbox://styles/mapbox/standard"}
        projection={"globe"}
      />
    </div>
  );
}

export default MainComponentNew;

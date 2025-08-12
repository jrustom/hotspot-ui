import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Nav from "./nav";
import { Toaster } from "sonner";

function MainComponent({ registered }: { registered: boolean }) {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const geoLocateRef = useRef<mapboxgl.GeolocateControl | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: -73.5674, lng: 45.5019 });
  const [userTrackingDenied, setUserTrackingDenied] = useState<boolean>(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.longitude,
        lng: position.coords.latitude,
      });

      setUserTrackingDenied(false)
    });
  }, []);
  // Initialize map once
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      zoom: 0,
      center: [0, 0], // Note: lng, lat order for Mapbox
    });


    // Add marker to user's current location
    geoLocateRef.current =
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })

    mapRef.current.addControl(geoLocateRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Smooth zoom animation when registration status changes
  useEffect(() => {
    if (mapRef.current) {
      if (registered) {
        if (!userTrackingDenied) {
          geoLocateRef.current?.trigger();
        } else {
          mapRef.current.easeTo({
            zoom: 10,
            center: [userLocation.lat, userLocation.lng],
            duration: 2000, // 2 seconds
          });
        }
      } else {
        mapRef.current.easeTo({
          zoom: 0,
          duration: 1000, // 1 second
        });
      }
    }
  }, [registered]);

  return (
    <div className="w-full h-full">
      <Nav mapRef={mapRef} />
      {/* <div className="w-full h-full bg-blue-200"></div> */}
      <div id="map-container" className={"w-full h-full relative"} ref={mapContainerRef} />


      <Toaster position="top-center" richColors />
    </div>
  );
}

export default MainComponent;

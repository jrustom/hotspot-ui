import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Nav from "./nav";

function MainComponent({ registered }: { registered: boolean }) {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: -73.5674, lng: 45.5019 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.longitude,
        lng: position.coords.latitude,
      });
    });
  }, []);

  // Initialize map once
  // useEffect(() => {
  //   mapboxgl.accessToken = accessToken;

  //   mapRef.current = new mapboxgl.Map({
  //     container: mapContainerRef.current!,
  //     zoom: 0,
  //     center: [0, 0], // Note: lng, lat order for Mapbox
  //   });

  //   return () => {
  //     mapRef.current?.remove();
  //   };
  // }, []);

  // Smooth zoom animation when registration status changes
  useEffect(() => {
    if (mapRef.current) {
      if (registered) {
        mapRef.current.easeTo({
          zoom: 10,
          center: [userLocation.lat, userLocation.lng],
          duration: 2000, // 2 seconds
        });
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
      <Nav />
      <div className="w-full h-full bg-blue-200"></div>
      {/* <div id="map-container" className={"w-full h-full relative"} ref={mapContainerRef}>
        <div
          className="aspect-square w-8 h-8 z-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg flex items-center justify-center pointer-events-none"
          style={{
            background: "transparent",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            outline: "2px solid black",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-transparent border-2 border-white"></div>
        </div>
      </div> */}
    </div>
  );
}

export default MainComponent;

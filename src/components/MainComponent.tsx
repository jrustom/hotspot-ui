import Map, { Marker } from "react-map-gl/mapbox";
import type { MapRef, ViewState } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import HotSpot from "./Hotspot";
import Nav from "./Nav";
import { Toaster } from "./ui/sonner";
import ChatComponent from "./ChatComponent";
import { getHotspots, Hotspot } from "@/services/hotspotService";

function MainComponent({ registered }: { registered: boolean }) {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 45.5019, longitude: -73.5674 });
  const [userTrackingDenied, setUserTrackingDenied] = useState<boolean>(true);
  const [viewState, setViewState] = useState(() => {
    const lastUserLocation = localStorage.getItem("lastUserLocation");

    if (lastUserLocation != null) {
      return JSON.parse(lastUserLocation);
    }

    return {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    };
  });

  const [chatActive, setChatActive] = useState<boolean>(false);
  const [activeChatID, setActiveChatID] = useState<string | null>(null);

  const mapRef = useRef<MapRef | null>(null);
  const geoLocateRef = useRef<mapboxgl.GeolocateControl | null>(null);

  const [hotspots, setHotspots] = useState<Hotspot[]>([]);

  const updateViewState = (viewState: ViewState) => {
    localStorage.setItem("lastUserLocation", JSON.stringify(viewState));
    setViewState(viewState);
  };

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

  useEffect(() => {
    // fetch hotspots
    try {
      getHotspots().then((response) => {
        // error
        if ("message" in response) {
          console.log(response.message);
        } else {
          // save in local storage
          localStorage.setItem("hotspots", JSON.stringify(response));
          setHotspots(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (hotspots.length > 0) {
      localStorage.setItem("hotspots", JSON.stringify(hotspots));
    }
  }, [hotspots]);

  return (
    <div className="w-full h-full">
      <Nav mapRef={mapRef} />

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => updateViewState(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle={"mapbox://styles/mapbox/standard"}
        projection={"globe"}
      >
        {hotspots.map((hotspot) => {
          return (
            <Marker
              longitude={hotspot.location.longitude}
              latitude={hotspot.location.latitude}
            >
              <HotSpot
                hotspotInfo={hotspot}
                setChatActive={setChatActive}
                setActiveChatID={setActiveChatID}
              />
            </Marker>
          );
        })}
      </Map>

      {chatActive && activeChatID && (
        <ChatComponent chatId={activeChatID} setChatActive={setChatActive} />
      )}

      <Toaster position="top-center" richColors />
    </div>
  );
}

export default MainComponent;

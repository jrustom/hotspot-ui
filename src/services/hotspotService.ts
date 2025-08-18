import { LngLat } from "mapbox-gl";
import { HotspotError } from "./accountService";

export interface Hotspot {
  id: string;
  active: boolean;
  chatId: string;
  upvotes: number;
  downvotes: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export async function generateNewHotspot(
  coordinates: LngLat | undefined
): Promise<void | HotspotError> {
  try {
    if (!coordinates) throw new Error();

    const url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${url}/hotspots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lng: coordinates.lng, lat: coordinates.lat }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    // // For now nothing to do with this
    // const hotspotResponse: Hotspot = await response.json();
  } catch (error) {
    return {
      message:
        "An error occurred while trying to add this new hotspot, please try again later.",
    };
  }
}

// for now we'll just get this specific hotspot for testing
export async function getHotspots(): Promise<Hotspot[] | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${url}/hotspots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const hotspotResponse: Hotspot[] = await response.json();
    return hotspotResponse;
  } catch (error) {
    return {
      message: "An error occured while trying to retrieve hotspot.",
    };
  }
}

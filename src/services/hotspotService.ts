import { LngLat } from "mapbox-gl";
import { HotspotError } from "./accountService"


interface Hotspot {
  id: string,
  active: boolean,
  chatId: string,
  upvotes: number,
  downvotes: number
  location: {
    latitude: number,
    longitude: number
  }
}

export async function generateNewHotspot(coordinates: LngLat | undefined): Promise<void | HotspotError> {

  try {
    if (!coordinates) throw new Error;

    const response = await fetch('http://localhost:8080/hotspots', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lng: coordinates.lng, lat: coordinates.lat })
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    // For now nothing to do with this
    const hotspotResponse: Hotspot = await response.json();
    console.log(hotspotResponse);

  } catch (error) {
    return {
      message: "An error occurred while trying to add this new hotspot, please try again later."
    }
  }
}

// for now we'll just get this specific hotspot for testing
export async function getHotspots(): Promise<Hotspot | HotspotError> {

  try {
    const response = await fetch('http://localhost:8080/hotspots/689a86e2d6c65b6440c875d4', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const hotspotResponse: Hotspot = await response.json();
    console.log(hotspotResponse);
    return hotspotResponse;




  } catch (error) {
    return {
      message: "An error occured while trying to retrieve hotspot."
    }
  }


}

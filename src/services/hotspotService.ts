import { LngLat } from "mapbox-gl";
import { HotspotError } from "./accountService";
import { User } from "@/contexts/AuthContext";

export interface Hotspot {
  id: string;
  name: string;
  active: boolean;
  chatId: string;
  upvotes: number;
  downvotes: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface HotspotVote {
  id: string;
  name: string;
  active: boolean;
  chatId: string;
  upvotes: number;
  downvotes: number;
  location: {
    latitude: number;
    longitude: number;
  };
  votingUser: User;
}

export async function generateNewHotspot(
  name: string,
  coordinates: LngLat | undefined,
): Promise<Hotspot | HotspotError> {
  try {
    if (!coordinates) throw new Error();
    const url = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${url}/hotspots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        lng: coordinates.lng,
        lat: coordinates.lat,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }
    const hotspotResponse: Hotspot = await response.json();
    return hotspotResponse;
  } catch (error) {
    return {
      message:
        "An error occurred while trying to add this new hotspot, please try again later.",
    };
  }
}

export async function getHotspots(): Promise<Hotspot[] | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${url}/hotspots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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

export async function upvoteHotspot(
  hotspotID: string,
  userID: string,
  setUserData: (user: User) => void
): Promise<Hotspot | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `${url}/hotspots/upvotes/${hotspotID}/${userID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const hotspotResponse: HotspotVote = await response.json();

    setUserData(hotspotResponse.votingUser);

    return hotspotResponse;
  } catch (error) {
    return {
      message: "An error occured while trying to upvote hotspot",
    };
  }
}

export async function cancelUpvoteHotspot(
  hotspotID: string,
  userID: string,
  setUserData: (user: User) => void
): Promise<Hotspot | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `${url}/hotspots/upvotes/${hotspotID}/${userID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const hotspotResponse: HotspotVote = await response.json();

    setUserData(hotspotResponse.votingUser);

    return hotspotResponse;
  } catch (error) {
    return {
      message: "An error occured while trying to cancel upvote for hotspot",
    };
  }
}

export async function activateHotspot(
  hotspotID: string
): Promise<Hotspot | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${url}/hotspots/${hotspotID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const hotspotResponse: Hotspot = await response.json();

    return hotspotResponse;
  } catch (error) {
    return {
      message: "An error occured while trying to activate the hotspot",
    };
  }
}

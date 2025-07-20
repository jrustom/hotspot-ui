import { LngLat } from "mapbox-gl";
import { HotspotError } from "./accountService"


interface Hotspot {
	id: string,
	active: boolean,
	chatId: string,
	upvotes: number,
	downvotes: number
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

		const hotspotResponse: Hotspot = await response.json();
		console.log(hotspotResponse);

	} catch (error) {
		return {
			message: "An error occurred while trying to add this new hotspot, please try again later."
		}
	}
}

import { useAuth } from "@/contexts/AuthContext";
import {
  activateHotspot,
  cancelUpvoteHotspot,
  getHotspots,
  Hotspot,
  HotspotVote,
  upvoteHotspot,
} from "@/services/hotspotService";
import { RefObject, useEffect, useState } from "react";
import { MapRef } from "react-map-gl/mapbox";

function Voting({
  mapRef,
  hotspots,
  setHotspots,
}: {
  mapRef: RefObject<MapRef | null>;
  hotspots: Hotspot[];
  setHotspots: (hotspots: Hotspot[]) => void;
}) {
  const { userData, setUserData } = useAuth();

  const moveToHotspot = (location: { latitude: number; longitude: number }) => {
    mapRef.current?.getMap().flyTo({
      zoom: 15,
      center: [location.longitude, location.latitude],
      duration: 2000,
    });
  };

  const handleUpvote = async (hotspotId: string) => {
    // if already voted for, remove the upvote, else upvote
    if (userData && hotspots) {
      let response;
      if (userData?.voteRecords[hotspotId] === "UPVOTE") {
        response = await cancelUpvoteHotspot(
          hotspotId,
          userData.id,
          setUserData
        );
      } else {
        response = await upvoteHotspot(hotspotId, userData.id, setUserData);
      }

      if ("message" in response) {
        console.log(response.message);
        return;
      }

      let updatedHotspot = response as Hotspot;

      if (updatedHotspot.upvotes >= 5) {
        const response = await activateHotspot(updatedHotspot.id);
        updatedHotspot = response as Hotspot;
      }

      // update hotspots
      const updatedHotspots: Hotspot[] = hotspots.map((hotspot) =>
        hotspot.id === updatedHotspot.id ? updatedHotspot : hotspot
      );

      localStorage.setItem("hotspots", JSON.stringify(updatedHotspots));
      setHotspots(updatedHotspots);
    }
  };

  return (
    <div className="p-4 min-w-50 bg-white rounded-md">
      <div className="space-y-2">
        {hotspots && hotspots.length > 0 ? (
          (() => {
            const inactiveHotspots = hotspots.filter(
              (hotspot) => !hotspot.active
            );

            return inactiveHotspots.length > 0 ? (
              inactiveHotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="py-3 px-5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 cursor-pointer flex flex-col items-center justify-between"
                  onClick={() => moveToHotspot(hotspot.location)}
                >
                  <div className="pb-2">
                    <div className="text-xl font-medium text-gray-800">
                      {hotspot.name}
                    </div>
                  </div>
                  {/* make the background the opposite colour of what it is so green and then back to normal if its already green */}
                  <button
                    className={`px-5 py-2 ${
                      userData?.voteRecords[hotspot.id] === "UPVOTE"
                        ? "bg-green-500 hover:bg-white"
                        : "bg-white hover:bg-green-500"
                    } text-black text-md font-medium rounded-md transition-colors duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpvote(hotspot.id);
                    }}
                  >
                    Upvote
                  </button>

                  {/* Progress bar for upvotes */}
                  <div className="w-full mt-2 px-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">
                        {hotspot.upvotes} / 5 upvotes
                      </span>
                      <span className="text-xs text-gray-600">
                        {Math.round((hotspot.upvotes / 5) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            (hotspot.upvotes / 5) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm text-center py-8">
                No inactive hotspots available for voting.
                <br />
                <span className="text-xs">
                  All hotspots have been activated!
                </span>
              </div>
            );
          })()
        ) : (
          <div className="text-gray-500 text-sm">No hotspots found</div>
        )}
      </div>
    </div>
  );
}

export default Voting;

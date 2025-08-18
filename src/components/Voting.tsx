import { Hotspot } from "@/services/hotspotService";
import { useState } from "react";

function Voting() {
  const [hotspots] = useState<Hotspot[] | null>(() => {
    const hotspots = localStorage.getItem("hotspots");

    if (hotspots) return JSON.parse(hotspots);
  });

  return (
    <div className="p-4 min-w-64">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Hotspots</h3>

      <div className="space-y-2">
        {hotspots && hotspots.length > 0 ? (
          hotspots.map((hotspot, index) => (
            <div
              key={hotspot.id}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 cursor-pointer"
            >
              <div className="text-sm font-medium text-gray-800">
                Hotspot {index + 1}
              </div>
              <div className="text-xs text-gray-600 mt-1">ID: {hotspot.id}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No hotspots found</div>
        )}
      </div>
    </div>
  );
}

export default Voting;

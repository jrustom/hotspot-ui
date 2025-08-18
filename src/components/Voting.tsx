import { Hotspot } from "@/services/hotspotService";
import { useState } from "react";

function Voting() {

  const [hotspots] = useState<Hotspot[] | null>(() => {
    const hotspots = localStorage.getItem('hotspots');

    if (hotspots)
      return JSON.parse(hotspots);
  });






  return (
    <>
    </>
  )
}

export default Voting;

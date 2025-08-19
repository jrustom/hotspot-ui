// the nav will be collapsible on the left (bottom on mobile) and will have sections for account details, voting/hotspots/newhotspots, and personal chats

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "./ui/popover";
import { useState, RefObject } from "react";
import NewHotspot from "./NewHotspot";
import AccountSettings from "./AccountSettings";
import { MapRef } from "react-map-gl/mapbox";
// import Voting from "./Voting";
// className="absolute w-15 left-5 top-1/2 -translate-y-1/2 z-1 bg-white rounded-md"

function Nav({ mapRef }: { mapRef: RefObject<MapRef | null> }) {
  const [newHotspotButton, setNewHotspotButton] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row md:flex-col justify-between absolute top-[98%] md:top-1/2 left-1/2 md:left-5 -translate-x-1/2 md:translate-x-0 -translate-y-full md:-translate-y-1/2 bg-white rounded-md z-1 w-max md:w-15 h-[10%] md:h-auto md:px-0">
        <Popover open={newHotspotButton} onOpenChange={setNewHotspotButton}>
          <PopoverTrigger asChild>
            <img
              className={
                "aspect-square h-full p-3 md:p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors data-[state=open]:bg-gray-200"
              }
              src="/src/assets/addIcon.png"
            />
          </PopoverTrigger>
        </Popover>

        {/* <Popover> */}
        {/*   <PopoverTrigger asChild> */}
        {/*     <img */}
        {/*       className={ */}
        {/*         "aspect-square h-full mx-2 md:mx-0 md:my-2 p-3 md:p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors data-[state=open]:bg-gray-200" */}
        {/*       } */}
        {/*       src="/src/assets/votingIcon.png" */}
        {/*     /> */}
        {/*   </PopoverTrigger> */}
        {/*   <PopoverContent side="right" sideOffset={10}> */}
        {/*     <Voting /> */}
        {/*   </PopoverContent> */}
        {/* </Popover> */}

        <Popover>
          <PopoverTrigger asChild>
            <img
              className={
                "aspect-square h-full p-3 md:p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors data-[state=open]:bg-gray-200"
              }
              src="/src/assets/settingsIcon.png"
            />
          </PopoverTrigger>
          <PopoverContent side="right" sideOffset={10}>
            <AccountSettings />
          </PopoverContent>
        </Popover>
      </div>
      {newHotspotButton && (
        <NewHotspot setStatus={setNewHotspotButton} mapRef={mapRef} />
      )}
    </>
  );
}

export default Nav;

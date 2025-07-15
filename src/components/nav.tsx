// the nav will be collapsible on the left (bottom on mobile) and will have sections for account details, voting/hotspots/newhotspots, and personal chats

import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "./ui/popover";
import NewHotspot from "./newHotspot";
// className="absolute w-15 left-5 top-1/2 -translate-y-1/2 z-1 bg-white rounded-md"

function Nav() {
  return (
    <div className="flex flex-row md:flex-col justify-between absolute top-[98%] md:top-1/2 left-1/2 md:left-5 -translate-x-1/2 md:translate-x-0 -translate-y-full md:-translate-y-1/2 bg-white rounded-md z-1 w-max md:w-15 h-[10%] md:h-auto md:px-0">
      <Popover>
        <PopoverTrigger asChild>
          <img
            className={
              "aspect-square h-full p-3 md:p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors data-[state=open]:bg-gray-200"
            }
            src="/src/assets/addIcon.png"
          />
        </PopoverTrigger>
        <PopoverContent className="" side="right" sideOffset={10}>
          <NewHotspot />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <img
            className={
              "aspect-square h-full mx-2 md:mx-0 md:my-2 p-3 md:p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors data-[state=open]:bg-gray-200"
            }
            src="/src/assets/votingIcon.png"
          />
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={10}></PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <img
            className={
              "aspect-square h-full p-3 md:p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors data-[state=open]:bg-gray-200"
            }
            src="/src/assets/settingsIcon.png"
          />
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={10}></PopoverContent>
      </Popover>
    </div>
  );
}

export default Nav;

import { generateNewHotspot } from '@/services/hotspotService';
import { Button } from './ui/button';
import { RefObject } from 'react';
import { toast } from 'sonner';
import { MapRef } from 'react-map-gl/mapbox';

function NewHotspot({ setStatus, mapRef }: { setStatus: (value: boolean) => void, mapRef: RefObject<MapRef | null> }) {

  const handleClick = () => {
    try {
      generateNewHotspot(mapRef.current?.getCenter()).then((error) => {
        if (error) {
          toast.error(error.message);
        }
      }
      );
    } catch (error) {
      console.log(error);
    }

    setStatus(false);
  }



  return <>
    <div
      className="aspect-square w-8 h-8 z-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg flex items-center justify-center pointer-events-none"
      style={{
        background: "transparent",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        outline: "2px solid black",
      }}
    >
      <div className="w-3 h-3 rounded-full bg-transparent border-2 border-white"></div>
    </div>
    <Button variant="outline" className="z-50 absolute bottom-10 left-1/2 -translate-x-1/2 border border-black" onClick={handleClick}>Confirm</Button>
  </>;
}

export default NewHotspot;

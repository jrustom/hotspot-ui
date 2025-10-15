import { generateNewHotspot, Hotspot } from "@/services/hotspotService";
import { Button } from "./ui/button";
import { RefObject, useState } from "react";
import { MapRef } from "react-map-gl/mapbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "@/contexts/AuthContext";

function NewHotspot({
  setStatus,
  mapRef,
  hotspots,
  setHotspots,
}: {
  setStatus: (value: boolean) => void;
  mapRef: RefObject<MapRef | null>;
  hotspots: Hotspot[];
  setHotspots: (hotspots: Hotspot[]) => void;
}) {
  const [hotspotName, setHotspotName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { userData } = useAuth();

  const handleCancel = () => {
    setStatus(false);
    setIsDialogOpen(false);
    setHotspotName("");
  };

  const handleClick = async () => {
    try {
      const response = await generateNewHotspot(
        hotspotName,
        mapRef.current?.getCenter()
        userData?.token
      );

      const createdHotspot = response as Hotspot;

      const newHotspots: Hotspot[] = hotspots;
      newHotspots.push(createdHotspot);

      setHotspots(newHotspots);
    } catch (error) {
      console.log(error);
    }

    setStatus(false);
    setIsDialogOpen(false);
    setHotspotName("");
  };

  return (
    <>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="z-50 absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          <DialogTrigger asChild>
            <Button variant="outline" className="border border-black">
              Confirm
            </Button>
          </DialogTrigger>
          <Button
            variant="outline"
            className="border border-black"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Hotspot</DialogTitle>
            <DialogDescription>
              Enter a name for your new hotspot. This will help others identify
              and find your location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={hotspotName}
                onChange={(e) => setHotspotName(e.target.value)}
                className="col-span-3"
                placeholder="Enter hotspot name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleClick}
              disabled={!hotspotName.trim()}
            >
              Create Hotspot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewHotspot;

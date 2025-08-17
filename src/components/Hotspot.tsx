import { Hotspot } from "@/services/hotspotService";

function HotSpot({
  hotspotInfo,
  setChatActive,
  setActiveChatID,
}: {
  hotspotInfo: Hotspot;
  setChatActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveChatID: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const handleClick = () => {
    setChatActive(true);
    setActiveChatID(hotspotInfo.chatId);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-6 h-6 rounded-full bg-red-500 bg-opacity-50 border-2 border-red-700"
      />
    </>
  );
}

export default HotSpot;

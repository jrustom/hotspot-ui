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
        className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white shadow-lg hover:scale-110 transition-transform"
      />
    </>
  );
}

export default HotSpot;

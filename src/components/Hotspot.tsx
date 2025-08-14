function HotSpot({ setChatActive }: { setChatActive: React.Dispatch<React.SetStateAction<boolean>> }) {

  const handleClick = () => {
    setChatActive(true)
  }

  return (
    <>
      <div onClick={handleClick} className="w-6 h-6 rounded-full bg-red-500 bg-opacity-50 border-2 border-red-700" />

    </>
  )
}

export default HotSpot;

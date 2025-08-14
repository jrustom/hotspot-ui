

function ChatComponent({ setChatActive }: { setChatActive: React.Dispatch<React.SetStateAction<boolean>> }) {
  // this will be a shadcn component

  const handleClick = () => {
    setChatActive(false);
  }


  return (

    <>
      <div className="fixed inset-0 z-4 bg-transparent pointer-events-auto">
        {/* This invisible overlay captures all pointer events */}
      </div>
      <div onClick={handleClick} className="fixed top-1/2 left-1/2 z-5 w-100 h-100 bg-gray-200 rounded-md opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

export default ChatComponent;

import { useEffect, useState } from "react";
import "./App.css";
import AccountRegistration from "./components/accountRegistration";
import MainComponent from "./components/mainComponent";
import { useAuth } from "./contexts/AuthContext";
import MainComponentNew from "./components/mainComponentNew";

function App() {
  const { userData } = useAuth();
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (userData != null) setRegistered(true);
  }, [userData]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-5 ${registered ? "hidden" : ""
          }`}
      >
        <AccountRegistration />
      </div>
      <div className="flex-1">
        <MainComponentNew registered={registered} />
      </div>
    </>
  );
}

export default App;

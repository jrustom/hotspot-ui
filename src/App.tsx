import { useEffect, useState } from "react";
import "./App.css";
import AccountRegistration from "./components/AccountRegistration";
import { useAuth } from "./contexts/AuthContext";
import MainComponent from "./components/MainComponent";

function App() {
  const { userData } = useAuth();
  const [registered, setRegistered] = useState<boolean>(true);

  useEffect(() => {
    if (userData == null) setRegistered(false);
    else setRegistered(true);
  }, [userData]);

  return (
    <>
      {registered ? (
        <></>
      ) : (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-5`}
        >
          <AccountRegistration />
        </div>
      )}
      <div className="flex-1">
        <MainComponent registered={registered} />
      </div>
    </>
  );
}

export default App;

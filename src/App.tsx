import { useEffect, useState } from "react";
import "./App.css";
import AccountRegistration from "./components/accountRegistration";
import MainComponent from "./components/mainComponent";
import { useAuth } from "./contexts/AuthContext";

function App() {
	const { userData } = useAuth();
	const [registered, setRegistered] = useState<boolean>(true);

	useEffect(() => {
		if (userData != null) setRegistered(true);
	}, [userData]);

	return (
		<>
			<div
				className={`fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-1 ${registered ? "hidden" : ""
					}`}
			>
				<AccountRegistration />
			</div>
			<div className="flex-1">
				<MainComponent registered={registered} />
			</div>
		</>
	);
}

export default App;

import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  username: string;
  profilePicture: string;
}

interface UserAuth {
  userData: User | null;
  setUserData: (user: User) => void;
}

const AuthContext = createContext<UserAuth>({
  userData: null,
  setUserData: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<User | null>(null);

  // will need to redefine setUserData to pass in null being a logout, and
  // setting the locastorage accordingly

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userData");

    if (storedUserInfo != null) {
      setUserData(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    if (userData != null)
      localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

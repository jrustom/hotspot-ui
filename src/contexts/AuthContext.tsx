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

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

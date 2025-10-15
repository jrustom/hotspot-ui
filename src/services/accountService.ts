import { User } from "@/contexts/AuthContext";

export interface HotspotError {
  message: string;
}

export async function handleSignUp(
  setUserData: (user: User) => void,
  username: string,
  password: string,
  profilePicture: string
): Promise<void | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, profilePicture }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const userResponse = await response.json();

    // Save user info in context
    setUserData(userResponse);
    localStorage.setItem("jwt", userResponse.token);

  } catch (error) {
    return {
      message:
        "An error occurred while trying to sign up, please try again later.",
    };
  }
}

export async function handleLogin(
  setUserData: (user: User) => void,
  username: string,
  password: string
): Promise<void | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const userResponse = await response.json();

    setUserData(userResponse);
    localStorage.setItem("jwt", userResponse.token);

  } catch (error) {
    return {
      message:
        "An error occurred while trying to login, please try again later.",
    };
  }
}

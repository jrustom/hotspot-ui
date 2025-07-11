import { User } from "@/contexts/AuthContext";

interface HotspotError {
  message: string;
}

export async function handleSignUp(
  setUserData: (user: User) => void,
  name: string,
  email: string,
  password: string
): Promise<void | HotspotError> {
  try {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const userResponse: User = await response.json();

    // Save user info in context
    setUserData(userResponse);
  } catch (error) {
    return {
      message:
        "An error occurred while trying to sign up, please try again later.",
    };
  }
}

export async function handleLogin(
  setUserData: (user: User) => void,
  email: string,
  password: string
): Promise<void | HotspotError> {
  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const userResponse: User = await response.json();

    setUserData(userResponse);
  } catch (error) {
    return {
      message:
        "An error occurred while trying to login, please try again later.",
    };
    // return {
    //   message:
    //     error instanceof Error
    //       ? error.message
    //       : "An error occurred while trying to login, please try again later.",
    // };
  }
}

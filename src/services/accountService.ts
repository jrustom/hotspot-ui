import { User } from "@/contexts/AuthContext";

export async function handleSignUp(
  setUserData: (user: User) => void,
  name: string,
  email: string,
  password: string
) {
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
      console.log(error);
    }

    const userResponse: User = await response.json();

    // Save user info in context
    setUserData(userResponse);
  } catch (error) {
    console.log(error);
  }
}

export async function handleLogin(
  setUserData: (user: User) => void,
  email: string,
  password: string
) {
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
      console.log(error);
    }

    const userResponse: User = await response.json();

    setUserData(userResponse);
  } catch (error) {
    console.log(error);
  }
}

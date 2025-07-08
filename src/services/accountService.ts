type UserResponseDto = {
  id: string;
  name: string;
  email: string;
};


export async function handleSignUp(name: string, email: string, password: string) {
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

    const userResponse: UserResponseDto = await response.json();

    console.log(userResponse.id);
    console.log(userResponse.name);
    console.log(userResponse.email);
  } catch (error) {
    console.log(error);
  }
}

export async function handleLogin(email: string, password: string) {
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

    const userResponse: UserResponseDto = await response.json();

    console.log(userResponse.id);
    console.log(userResponse.name);
    console.log(userResponse.email);
  } catch (error) {
    console.log(error);
  }
}

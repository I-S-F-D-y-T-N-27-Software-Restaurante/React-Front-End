export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  user_email: string;
  roles: string[];
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Login failed");
  }

  const data: LoginResponse = await res.json();

  // localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("user_email", data.user_email);
  localStorage.setItem("user_id", data.user_id);
  localStorage.setItem("roles", JSON.stringify(data.roles));

  return data;
}

export async function logOut() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    let errorMessage = "Something went wrong";
    try {
      const errorData = await res.json();
      errorMessage = errorData?.detail || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return true;
}

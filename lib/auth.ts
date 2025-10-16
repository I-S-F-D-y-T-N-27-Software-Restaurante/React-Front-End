export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  user_email: string;
  roles: string[];
}

export async function login(email: string, password: string) {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;

  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || "Login failed");
    }

    const data: LoginResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error at login: ", error);
  }
}

export async function logOut() {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/users/logout`;

  const res = await fetch(uri, {
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

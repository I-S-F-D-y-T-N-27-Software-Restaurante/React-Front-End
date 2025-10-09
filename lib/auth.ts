export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  user_email: string;
  roles: string[];
}

export async function apiFetch(path: RequestInfo, init: RequestInit = {}) {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}${path}`;

  try {
    const res = await fetch(uri, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      credentials: "include",
    });

    if (res.status === 401) {
      window.location.href = "/login";
      return res;
    }

    if (res.status === 403) {
      window.location.href = "/";
      return;
    }

    return res;
  } catch (error) {
    console.error("error at apiFetch: ", error);
  }
}

export async function login(email: string, password: string) {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const res = await apiFetch("/users/login", init);

    if (!res) return;

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const data: LoginResponse = await res.json();

    return data;
  } catch (error) {
    console.error("Error at login: ", error);
  }
}

export async function logOut() {
  const init = {
    method: "POST",
  };

  const res = await apiFetch("/users/logout", init);

  if (!res) return;

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

import { UserInfo } from "../hooks/useRoleContext";
import { logFailedFetch } from "./utils";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  user_email: string;
  roles: string[];
}

export async function fetchUserMe(): Promise<UserInfo | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      logFailedFetch(res);
      return null;
    }
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

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
      await logFailedFetch(res);
      return [];
    }

    const data: LoginResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error at login: ", error);
  }
}

export async function logOut() {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;

  const res = await fetch(uri, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    logFailedFetch(res);
  }

  return true;
}

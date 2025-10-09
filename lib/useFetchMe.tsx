import { useState, useEffect } from "react";
import { apiFetch } from "../lib/auth";

export type UserInfo = {
  user_id: string;
  user_email: string;
  roles: string[];
};

export function useFetchMe() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiFetch("/users/me");

        if (!res) return;

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}

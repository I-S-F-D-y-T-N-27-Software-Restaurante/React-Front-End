"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchUserMe } from "../lib/auth";

export type UserInfo = {
  user_id: string;
  user_email: string;
  roles: string[];
};

type UserContextType = {
  user: UserInfo | null;
  loading: boolean;
  error: unknown;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo>({
    user_email: "couldnt retrieve email info.",
    user_id: ": No data",
    roles: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const data = await fetchUserMe();
        if (!data) throw Error("Error retrieving data.");
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

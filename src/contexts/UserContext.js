import React, { useEffect, createContext, useState } from "react";
import { supabase } from "../lib/supabase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(session)

  return (
    <UserContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

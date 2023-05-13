import React, { useEffect, createContext, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const supabase = useSupabaseClient();

  const [events, setEvents] = useState();
  
  const selectEvents = async () => {
    let { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.log(error);
    } else {
      setEvents(data);
    }
  };

  useEffect(() => {
    selectEvents();
  }, []);

  return (
    <AppContext.Provider value={{ events }}>{children}</AppContext.Provider>
  );
};

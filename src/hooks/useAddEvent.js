import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const addEvent = ({ }) => {
  const supabase = useSupabaseClient();

  const addEvent = async () => {
    let { error } = await supabase
      .from("events")
      .insert({})
  };

  useEffect(() => {
    addEvent();
  }, []);

  return {};
};

import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useEditEvent = ({ id, name, location }) => {
  const supabase = useSupabaseClient();

  const editEvent = async () => {
    let { error } = await supabase
      .from("events")
      .update({ name: "Australia" })
      .eq("id", id);
  };

  useEffect(() => {
    editEvent();
  }, []);

  return {};
};

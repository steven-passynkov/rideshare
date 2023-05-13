import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useDeleteEvent = ({ id }) => {
  const supabase = useSupabaseClient();

  const deleteEvent = async () => {
    let { error } = await supabase.from("events").delete().eq("id", id);
  };

  useEffect(() => {
    deleteEvent();
  }, []);

  return {};
};

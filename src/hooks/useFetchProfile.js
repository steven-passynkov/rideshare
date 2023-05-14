import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useFetchProfile = ({ profile }, getProfile) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchProfile = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select("name, profile_picture")
      .eq("id", profile);
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (getProfile) {
      fetchProfile();
    }
  }, [getProfile]);

  return { data, error };
};

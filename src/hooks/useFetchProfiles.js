import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useFetchProfiles = ({ profiles }, getProfiles) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchProfiles = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .in("id", profiles);
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (getProfiles) {
      fetchProfiles();
    }
  }, [getProfiles]);

  return { data, error };
};

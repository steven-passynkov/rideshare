import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useSignout = (shouldSignout) => {
  const [error, setError] = useState();
  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    setError(error);
  };

  useEffect(() => {
    if (shouldSignout) {
      logOut();
    }
  }, [shouldSignout]);

  return { error };
};

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useLogin = ({ email, password },  shouldLogin) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const logIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (shouldLogin) {
      logIn();
    }
  }, [shouldLogin]);

  return { data, error };
};

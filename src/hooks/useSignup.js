import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useSignup = ({ name, email, password }, shouldSignup) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const signUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: name,
        },
      },
    });
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (shouldSignup) {
      signUp();
    }
  }, [shouldSignup]);

  return { data, error };
};

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const useAddImage = ({ image }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const addImage = async () => {
    let { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${uuidv4()}.jpg`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (image) {
      addImage();
    }
  }, [image]);

  return { data, error };
};

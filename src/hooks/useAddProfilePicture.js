import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const useAddProfilePicture = ({ image }) => {
  const [storedProfilePicture, setStoredProfilePicture] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const storeProfilePicture = async () => {
    let { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${uuidv4()}.jpg`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    setStoredProfilePicture(data);
    setError(error);
  };

  const addProfilePicture = async () => {
    let { data, error } = await supabase.auth.update({
      data: {
        profile_picture: storedProfilePicture,
      },
    });
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (image) {
      storeProfilePicture();
      if (storedProfilePicture) {
        addProfilePicture();
      }
    }
  }, [image]);

  return { data, error };
};

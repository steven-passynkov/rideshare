import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const useSignup = ({ name, image, email, password }, shouldSignup) => {
  const [storedProfilePicture, setStoredProfilePicture] = useState();
  const [signUpData, useSignUpData] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const storeProfilePicture = async () => {
    let { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${uuidv4()}.jpg`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    setStoredProfilePicture(data.path);
    setError(error);
  };

  const signUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: name,
          profile_picture: storedProfilePicture,
        },
      },
    });
    useSignUpData(data);
    setError(error);
  };

  const addSignUpData = async () => {
    let { data, error } = await supabase.from("profiles").insert({
      id: signUpData.user.id,
      name: name,
      profile_picture: storedProfilePicture,
      email:email,
    });
    setData(data);
    setError(error);
  };

  useEffect(() => {
    if (image) {
      storeProfilePicture();
    }
  }, [image]);

  useEffect(() => {
    if (shouldSignup) {
      signUp();
    }
  }, [shouldSignup]);

  useEffect(() => {
    if (signUpData) {
      addSignUpData();
    }
  }, [signUpData]);

  return { data, error };
};

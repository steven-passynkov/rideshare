import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const useSignup = ({ name, image, email, password }, shouldSignup) => {
  const [storedProfilePicture, setStoredProfilePicture] = useState();
<<<<<<< HEAD
  const [signUpData, useSignUpData] = useState();
=======
>>>>>>> 73fae58d8036427332336dbeae342a3d6f343505
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
<<<<<<< HEAD
=======
    console.log(data)
>>>>>>> 73fae58d8036427332336dbeae342a3d6f343505
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

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useAddEvent = ({ name, description, location, image, max_people }, shouldAddEvent) => {
  const addEvent = async () => {
    let { error } = await supabase.from("events").insert({
      name: name,
      description: description,
      location: location,
      image, image,
      max_people: max_people,
    });
  };

  useEffect(() => {
    if (shouldAddEvent) {
      addEvent();
    }
  }, [shouldAddEvent]);

  return {};
};

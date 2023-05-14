import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useAddEvent = ({ name, description, location, image, max_people,date, time, categories,user }, shouldAddEvent) => {
  const addEvent = async () => {
    let { error } = await supabase.from("events").insert({
      name: name,
      description: description,
      location: location,
      image, image,
      max_people: max_people,
      date: date,
      time: time,
      categories: {"categories":[categories]},
      user:user,
    });
  };

  useEffect(() => {
    if (shouldAddEvent) {
      addEvent();
    }
  }, [shouldAddEvent]);

  return {};
};

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const useFetchEvent = ({ id }) => {
  const [driverData, setDriverData] = useState();
  const [passengerrData, setPassengerrData] = useState();
  const [error, setError] = useState();

  console.log(id);

  const fetchDriverEvent = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("user", id);
    setDriverData(data);
    setError(error);
  };

  const fetchPassengerEvent = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("*")
      .match({ people: { people: [id] } });
    setPassengerrData(data);
    setError(error);
  };

  useEffect(() => {
    if (id) {
      fetchDriverEvent();
      fetchPassengerEvent();
    }
  }, [id]);

  return { driverData, passengerrData, error };
};

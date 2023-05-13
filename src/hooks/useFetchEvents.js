import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useFetchEvents = ({ pageNumber, pageSize }) => {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const { data, count, error } = await supabase
        .from("events")
        .select("*", { count: "exact" })
        .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);
      if (error) throw error;
      setEvents(data);
      setCount(count);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [pageNumber, pageSize]);

  return { events, count, error };
};

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useFetchEvents = ({ pageNumber, pageSize, filter }) => {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  //filter dose now work on last page when there is not 9

  const fetchEvents = async () => {
    if (filter) {
      try {
        const { data, count, error } = await supabase
          .from("events")
          .select("*", { count: "exact" })
          .limit(pageSize)
          .ilike("name", `%${filter}%`);
        if (error) throw error;
        setEvents(data);
        setCount(count);
      } catch (error) {
        setError(error);
      }
    } else {
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
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [pageNumber, pageSize, filter]);

  return { events, count, error };
};

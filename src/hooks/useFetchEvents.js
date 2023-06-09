import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useFetchEvents = ({
  pageNumber,
  pageSize,
  search,
  categories,
  date,
}) => {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    if (search || categories || date) {
      let query = supabase.from("events").select("*").limit(pageSize);

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }
      if (categories) {
        query = query.ilike("categories", `%${categories}%`);
      }
      if (date) {
        query = query.eq("date", date);
      }
      try {
        const { data, count, error } = await query;
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
  }, [pageNumber, pageSize, search, categories, date]);

  return { events, count, error };
};

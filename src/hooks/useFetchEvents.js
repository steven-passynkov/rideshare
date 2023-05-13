import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

<<<<<<< HEAD
export const useFetchEvents = ({ pageNumber, pageSize, filter }) => {
=======
export const useFetchEvents = ({ pageNumber, pageSize }) => {
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

<<<<<<< HEAD
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
=======
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
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
    }
  };

  useEffect(() => {
    fetchEvents();
<<<<<<< HEAD
  }, [pageNumber, pageSize, filter]);
=======
  }, [pageNumber, pageSize]);
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93

  return { events, count, error };
};

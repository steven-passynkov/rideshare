import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useEditEvent = (
  { id, name, max_people },
  shouldLoad,
  shouldJoin
) => {
  const [eventData, setEventData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();

  const fetchEvent = async () => {
    let { data, error } = await supabase
      .from("events")
      .select("people, max_people")
      .eq("id", id);
    setEventData(data);
    setLoaded(true);
  };

  const editEvent = async () => {
    let { error } = await supabase
      .from("events")
      .update({ people: { people: eventData[0].people.people.concat([name]) } })
      .eq("id", id);
    setError(error);
  };

  useEffect(() => {
    if (shouldLoad) {
      fetchEvent();
    }
  }, [shouldLoad]);

  useEffect(() => {
    if (shouldJoin && eventData) {
      if (eventData[0].max_people > max_people === false) {
        editEvent();
      }
    }
  }, [shouldJoin]);

  return { error, loaded };
};

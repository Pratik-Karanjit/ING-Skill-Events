import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const { eventId } = useParams();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchEvents(eventId) {
    const response = await axios.get(
      `https://ing-skill-events.onrender.com/entry/events/${eventId}`
    );
    // console.log("response data of calendar is here", response);
    return response.data;
  }

  const fetchData = async () => {
    try {
      const eventData = await fetchEvents(eventId);
      console.log("eventData is here", eventData);
      const formattedEvents = formatEvents(eventData?.result);
      console.log("response data of calendar is here", formattedEvents);

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events details:", error);
    }
  };

  const formatEvents = (eventsData) => {
    // Check if eventsData is an array
    if (Array.isArray(eventsData)) {
      return eventsData.map((event) => ({
        title: event.title,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
      }));
    } else if (typeof eventsData === "object" && eventsData !== null) {
      // If eventsData is an object, convert it into an array with a single element
      return [
        {
          title: eventsData.title,
          start: new Date(eventsData.start_date),
          end: new Date(eventsData.end_date),
        },
      ];
    } else {
      // If eventsData is neither an array nor an object
      console.error("Invalid events data:", eventsData);
      // Return an empty array
      return [];
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        events={events}
      />
    </div>
  );
};

export default Calendar;

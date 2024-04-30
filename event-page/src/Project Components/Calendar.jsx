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
      `http://localhost:8000/entry/events/${eventId}`
    );
    // console.log("response data hereeee", response);
    return response.data;
  }

  const fetchData = async () => {
    try {
      const eventData = await fetchEvents(eventId); // Assuming fetchEvents is defined elsewhere
      const formattedEvents = formatEvents(eventData.result);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events details:", error);
    }
  };

  const formatEvents = (eventsData) => {
    return eventsData.map((event) => ({
      title: event.title,
      start: new Date(event.start_date),
      end: new Date(event.end_date),
    }));
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

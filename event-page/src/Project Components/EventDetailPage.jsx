import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

async function fetchEvents(eventId) {
  const response = await axios.get(
    `http://localhost:8000/entry/events/${eventId}`
  );
  console.log("response data hereeee", response);
  return response.data;
}

function EventDetailPage() {
  const { eventId } = useParams();
  console.log("event id here", eventId);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const eventData = await fetchEvents(eventId);
      console.log("event data", eventData);
      setEvent(eventData);
      console.log("Fetched events data:", eventData);
    } catch (error) {
      console.error("Error fetching events details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  return (
    <div>
      {event ? (
        <div className="product-details">
          <h2>Event Detail</h2>
          <h3>{event.result?.title}</h3>
          <p>Price: ${event.result.price}</p>
          <p>Description: {event.result.description}</p>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
      <button className="btn-view" onClick={() => navigate("/")}>
        Back to events
      </button>
    </div>
  );
}

export default EventDetailPage;

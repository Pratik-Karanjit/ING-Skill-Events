import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import googleKeep from "../Photos/google_keep.png";
import { useDispatch } from "react-redux";
import { setNote } from "../features/noteSlice.js";

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
  const [showInputForm, setShowInputForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const toggleInputForm = () => {
    setShowInputForm(!showInputForm);
  };

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [...notes, newNote]; // Include the new note in the updated state
      setNotes(updatedNotes); // Update the local state
      setNewNote(""); // Clear the input field
      console.log("note here", updatedNotes); // Log the updated notes

      // Dispatch the action with the updated notes
      dispatch(setNote({ notes: updatedNotes }));
      localStorage.setItem("notes", updatedNotes);
    }
  };

  return (
    <div>
      {event ? (
        <div>
          <h2>Event Detail</h2>
          <h1>{event.result?.title}</h1>
          <h2>{event.result?.college}</h2>
          <p>Scope: {event.result?.scope}</p>
          <p>Description: {event.result.description}</p>
          <p>Start Date: {event.result?.start_date}</p>
          <p>End Date: {event.result?.end_date}</p>
          <p>
            Hosted By: <b>{event.result?.owner}</b>
          </p>
          <img
            className="event-detail-img"
            src={event.result.eventImage}
            alt="image"
          />
        </div>
      ) : (
        <p>Loading event details...</p>
      )}

      {showInputForm && (
        <div className="input-form-container">
          <input
            type="text"
            placeholder="Enter your note"
            value={newNote}
            onChange={handleChange}
          />
          <button className="add-form-btn" onClick={handleSubmit}>
            Add Note
          </button>
          <button className="close-form-btn" onClick={toggleInputForm}>
            Close
          </button>
          {notes.length > 0 && (
            <div className="notes-container">
              <h3>Notes:</h3>
              <div className="notes-wrapper">
                {notes.map((note, index) => (
                  <div key={index} className="note">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <button className="back-to-events-btn" onClick={() => navigate("/")}>
        Back to events
      </button>
      <br />
      <img
        onClick={toggleInputForm}
        className="google-keep"
        src={googleKeep}
        alt="google-keep"
      />
    </div>
  );
}

export default EventDetailPage;

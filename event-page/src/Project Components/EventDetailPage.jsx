import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import googleKeep from "../Photos/google_keep.png";
import { useDispatch } from "react-redux";
import { setNote } from "../features/noteSlice.js";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

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
  const [manpower, setManpower] = useState(null);
  const [resource, setResource] = useState(null);
  const [showInputForm, setShowInputForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const eventData = await fetchEvents(eventId);
      // console.log("event data", eventData);
      // Format start_date and end_date here
      eventData.result.start_date = new Date(
        eventData.result.start_date
      ).toLocaleDateString("en-US");
      eventData.result.end_date = new Date(
        eventData.result.end_date
      ).toLocaleDateString("en-US");
      setEvent(eventData);
      // console.log("Fetched events data:", eventData);
    } catch (error) {
      console.error("Error fetching events details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const fetchManpower = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/entry/getManpower/${eventId}`
      );

      // console.log("Manpower response", response.data.result);
      setManpower(response.data.result);
    } catch (error) {
      console.log("man power error:", error);
    }
  };

  useEffect(() => {
    fetchManpower();
  }, []);

  const fetchResource = async () => {
    try {
      const resourceResponse = await axios.get(
        `http://localhost:8000/entry/getResource/${eventId}`
      );
      // console.log("*********resource", resourceResponse);
      setResource(resourceResponse.data.result);
    } catch (error) {
      console.log("Resource error:", error);
    }
  };

  useEffect(() => {
    fetchResource();
  }, []);

  const getButtonColors = (tags) => {
    return tags.map((tag) => {
      switch (tag.toLowerCase().trim()) {
        case "east":
          return "#ff5733"; // Red for East
        case "west":
          return "#8ba0c7"; // Blue for West
        case "north":
          return "#00ff00"; // Green for North
        case "south":
          return "#800080"; // Purple for South
        default:
          return "#ffff00"; // Yellow for any other tag
      }
    });
  };

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
    <>
      {/* <img
              className="event-detail-img"
              src={`http://localhost:8000/${event.result.eventImage}`}
              alt="image"
            /> */}
      <NavBar />

      <div className="event-container">
        {event ? (
          <>
            <img
              className="event-detail-img"
              src={`http://localhost:8000/${event.result.eventImage}`}
              alt="image"
            />
            <div className="event-details">
              <h1>{event.result?.title}</h1>
              <table className="event-table">
                <tbody>
                  <tr>
                    <td className="table-header">
                      <b>SCOPE</b>
                    </td>
                    <td>{event.result?.scope}</td>
                  </tr>
                  <tr>
                    <td className="table-header">
                      <b>START DATE</b>
                    </td>
                    <td>{event.result?.start_date}</td>
                  </tr>
                  <tr>
                    <td className="table-header">
                      <b>END DATE</b>
                    </td>
                    <td>{event.result?.end_date}</td>
                  </tr>
                  <tr>
                    <td className="table-header">
                      <b>OWNER</b>
                    </td>
                    <td>{event.result?.owner}</td>
                  </tr>
                  <tr>
                    <td className="table-header">
                      <b>TAG</b>
                    </td>
                    <td>
                      {event.result.tag.map((tagString, idx) => {
                        const tags = tagString
                          .split(",")
                          .map((tag) => tag.trim());
                        return tags.map((tag, index) => (
                          <button
                            key={idx + index}
                            className="event-detail-tag"
                            style={{
                              backgroundColor: getButtonColors([tag])[0],
                            }}
                          >
                            {tag}
                          </button>
                        ));
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-header">
                      <b>DESCRIPTION</b>
                    </td>
                    <td>{event.result.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
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

        <div className="manpower-resource-container">
          {manpower ? (
            <div className="manpower-container">
              <table className="manpower-table">
                <thead>
                  <tr className="manpower-tr">
                    <th className="manpower-heading" colSpan="3">
                      Manpower
                    </th>
                  </tr>
                  <tr>
                    <th className="manpower-th">Name</th>
                    <th className="manpower-th">Responsibility</th>
                    <th className="manpower-th">Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                  {manpower.map((person, index) => (
                    <tr key={index}>
                      <td className="manpower-td">{person.name}</td>
                      <td className="manpower-td">{person.responsibility}</td>
                      <td className="manpower-td">{person.mobile_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No manpower data available</p>
          )}

          {resource ? (
            <div className="resource-container">
              <table className="resource-table">
                <thead>
                  <tr className="resource-tr">
                    <th className="resource-heading" colSpan="2">
                      Resource
                    </th>
                  </tr>
                  <tr>
                    <th className="resource-th">Item</th>
                    <th className="resource-th">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {resource.map((resource, index) => (
                    <tr key={index}>
                      <td className="manpower-td">{resource.item}</td>
                      <td className="manpower-td">{resource.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No resource data available</p>
          )}
        </div>

        <div className="branding-container">
          <table className="manpower-table">
            <tr className="manpower-tr">
              <th className="manpower-heading" colspan="3">
                Branding
              </th>
            </tr>
            <tr>
              <th className="manpower-th">Category</th>
              <th className="manpower-th">Asset</th>
              <th className="manpower-th">Quantity</th>
              <th className="manpower-th">Place</th>
            </tr>
            <tr>
              <td className="manpower-td">Pratik Karanjit </td>
              <td className="manpower-td">Manage overall event.</td>
              <td className="manpower-td">9837123122</td>
              <td className="manpower-td">Outside main gate</td>
            </tr>
            <tr>
              <td className="manpower-td">Ram Prasad </td>
              <td className="manpower-td">
                Manage incoming audience and traffic.{" "}
              </td>
              <td className="manpower-td">9837123122</td>
              <td className="manpower-td">Outside main gate</td>
            </tr>
          </table>
        </div>

        <br />
        <img
          onClick={toggleInputForm}
          className="google-keep"
          src={googleKeep}
          alt="google-keep"
        />
      </div>
      <Footer />
    </>
  );
}

export default EventDetailPage;

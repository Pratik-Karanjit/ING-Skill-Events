import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import googleKeep from "../Photos/google_keep.png";
import googleCalendar from "../Photos/Calendar.png";
import { useDispatch } from "react-redux";
import { setNote } from "../features/noteSlice.js";
import NavBar from "./NavBar.jsx";
import FooterOtherPages from "./FooterOtherPages.jsx";
import Calendar from "./Calendar.jsx";

async function fetchEvents(eventId) {
  const response = await axios.get(
    `https://ing-skill-events.onrender.com/entry/events/${eventId}`
  );
  // console.log("response data hereeee", response);
  return response.data;
}

function EventDetailPage() {
  const { eventId } = useParams();
  // console.log("event id here", eventId);
  const [event, setEvent] = useState(null);
  const [manpower, setManpower] = useState(null);
  const [resource, setResource] = useState(null);
  const [branding, setBranding] = useState(null);
  const [showInputForm, setShowInputForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedNotes = localStorage.getItem(`notes_${eventId}`);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [eventId]);

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  const fetchData = async () => {
    try {
      const eventData = await fetchEvents(eventId);
      console.log("event data", eventData);
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
        `https://ing-skill-events.onrender.com/entry/getManpower/${eventId}`
      );

      // console.log("Manpower response", response.data.result);
      setManpower(response.data.result);
    } catch (error) {
      console.log("man power error:", error);
    }
  };

  const fetchResource = async () => {
    try {
      const resourceResponse = await axios.get(
        `https://ing-skill-events.onrender.com/entry/getResource/${eventId}`
      );
      // console.log("*********resource", resourceResponse);
      setResource(resourceResponse.data.result);
    } catch (error) {
      console.log("Resource error:", error);
    }
  };

  const fetchBranding = async () => {
    try {
      const brandingResponse = await axios.get(
        `https://ing-skill-events.onrender.com/entry/getBranding/${eventId}`
      );
      // console.log("*********resource", resourceResponse);
      setBranding(brandingResponse.data.result);
    } catch (error) {
      console.log("Branding error:", error);
    }
  };

  useEffect(() => {
    fetchResource();

    fetchManpower();

    fetchBranding();
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

    // Toggle body displacement class
    document.body.classList.toggle("input-form-active");
  };
  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit = () => {
    if (newNote.trim() !== "") {
      const updatedNotes = [...notes, newNote];
      localStorage.setItem(`notes_${eventId}`, JSON.stringify(updatedNotes));

      setNotes(updatedNotes);
      setNewNote("");
      console.log("note here", updatedNotes);
      dispatch(setNote({ eventId, notes: updatedNotes }));
    }
  };

  const handleCalendar = (eventId) => {
    navigate(`/events/calendar/${eventId}`);
    console.log("eventId from calendar", eventId);
  };
  return (
    <>
      <NavBar />
      <div className="right-bar">
        <img
          onClick={toggleInputForm}
          className="google-keep"
          src={googleKeep}
          alt="google-keep"
        />
        <img
          onClick={() => handleCalendar(event?.result?.eventId)}
          className="google-calendar"
          src={googleCalendar}
          alt="google-calendar"
        />
      </div>

      {showInputForm && (
        <div className="input-form-container">
          <div className="input-field-wrapper">
            <h1 className="input-form-h1">Add your notes</h1>
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
        </div>
      )}
      <div className="content-container">
        <div className="event-container">
          {event ? (
            <>
              <img
                className="event-detail-img"
                src={`https://ing-skill-events.onrender.com/${event.result.eventImage}`}
                alt="image"
              />
              <div className="event-hero">
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
                        <td className="event-detail-tag-div">
                          {event?.result?.tag.split(",").map((tag, index) => (
                            <button
                              key={index}
                              className="event-detail-tag"
                              style={{
                                backgroundColor: getButtonColors([tag])[0],
                              }}
                            >
                              {tag.trim()}
                            </button>
                          ))}
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
                <div className="calendar-hero">
                  <Calendar />
                </div>
              </div>
            </>
          ) : (
            <p>Loading event details...</p>
          )}

          <div className="sm-calendar">
            <Calendar />
          </div>

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
              <p>Loading manpower data.</p>
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
              <p>Loading resource data.</p>
            )}
          </div>
          <div className="branding-container">
            {branding ? (
              <table className="branding-table">
                <thead>
                  <tr className="branding-tr">
                    <th className="branding-heading" colSpan="4">
                      Branding
                    </th>
                  </tr>
                  <tr>
                    <th className="branding-th">Category</th>
                    <th className="branding-th">Asset</th>
                    <th className="branding-th">Quantity</th>
                    <th className="branding-th">Place</th>
                  </tr>
                </thead>
                <tbody>
                  {branding.map((item, index) =>
                    item.asset.map((asset, i) => (
                      <tr key={`${index}-${i}`}>
                        {i === 0 && (
                          <td
                            rowSpan={item.asset.length}
                            className="branding-td"
                          >
                            {item.category}
                          </td>
                        )}
                        <td className="branding-td">{asset}</td>
                        <td className="branding-td">{item.quantity[i]}</td>
                        <td className="branding-td">{item.placement[i]}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <p>Loading branding data.</p>
            )}
          </div>

          <br />
          {/* <img
          onClick={toggleInputForm}
          className="google-keep"
          src={googleKeep}
          alt="google-keep"
        /> */}
        </div>
      </div>
      <FooterOtherPages />
    </>
  );
}

export default EventDetailPage;

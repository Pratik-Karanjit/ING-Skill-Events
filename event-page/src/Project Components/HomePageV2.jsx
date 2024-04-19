import React, { useEffect, useState } from "react";
import "./stylesheet.css";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const HomePageV2 = () => {
  const [expandBody, setExpandBody] = useState(false);
  const [changeNavColor, setChangeNavColor] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    hitApi();
  }, []);

  const hitApi = async () => {
    try {
      const response = await axios.get("http://localhost:8000/entry/events");
      console.log(response.data);
      setPosts(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleLearnMore = (eventId) => {
    navigate(`/events/${eventId}`);
    console.log("eventId from learn more", eventId);
  };

  const getCornerColor = (number) => {
    switch (number) {
      case 1:
        return "#ff5733";
      case 2:
        return "#00838d";
      case 3:
        return "#ffc300";

      default:
        return "#192936";
    }
  };

  return (
    <div className="main-wrapper">
      <NavBar />
      <div className="container2 ">
        <div className="color-div-section">
          {posts.map((post, index) => (
            <div
              className="color-div-card"
              key={index}
              // style={{ backgroundColor: getHoverBackgroundColor(index) }}
            >
              <div
                className="go-corner"
                style={{
                  backgroundColor: getCornerColor(index),
                  opacity: 0,
                }}
              ></div>
              <div className="bottom50">
                <p className="title-p">{post.title}</p>
                <p className="college-p">{post.college}</p>
                <div className="direction-buttons">
                  {post.tag.map((tagString, idx) => {
                    const tags = tagString.split(",").map((tag) => tag.trim());
                    return tags.map((tag, index) => (
                      <button
                        key={idx + index} // Use a unique key for each button
                        style={{ backgroundColor: getButtonColors([tag])[0] }}
                      >
                        {tag}
                      </button>
                    ));
                  })}
                </div>

                <p className="event-description">
                  {expandBody
                    ? post.description
                    : `${post.description?.slice(0, 80)}...`}
                  <button
                    className="learn-more-btn2"
                    onClick={() => handleLearnMore(post.eventId)}
                  >
                    <b>{expandBody ? "Read Less" : "Learn More"}</b>
                  </button>
                </p>
                <p>{post.eventId}</p>
                <p>
                  Hosted By:{" "}
                  <b style={{ font: "12px", letterSpacing: "0.5px" }}>
                    {post.owner}
                  </b>
                </p>
                <div className="start-end-div">
                  <p>
                    Start Date:{" "}
                    <b style={{ font: "12px", letterSpacing: "0.5px" }}>
                      {post.start_date}
                    </b>
                  </p>
                  <p>
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; End Date:{" "}
                    <b style={{ font: "12px", letterSpacing: "0.5px" }}>
                      {post.end_date}
                    </b>
                  </p>
                </div>

                <div>
                  <img
                    className="event-image"
                    src={post.eventImage}
                    alt="Product"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <h1>FOOTER SECTION</h1>{" "}
      </div>

      <div className="copyright">Copyright © ING Skill Events</div>
    </div>
  );
};

export default HomePageV2;

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

  const getButtonColor = (tag) => {
    switch (tag.toLowerCase()) {
      case "east":
        return "#ff5733"; // Red
      case "west":
        return "#8ba0c7"; // Blue
      case "north":
        return "#00ff00"; // Green
      case "south":
        return "#800080"; // Purple
      default:
        return "#ffff00"; // Yellow for any other tag
    }
  };

  const handleLearnMore = (number) => {
    navigate(`/events/${number}`);
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
        return "#cccccc";
    }
  };

  return (
    <div className="main-wrapper">
      <NavBar />
      <div className="container2">
        <div className="color-div-section">
          {posts.map((post, index) => (
            //  <div className="color-div-card" key={index} style={{ backgroundColor: getCornerColor(post.id) }}>

            <div className="color-div-card" key={index}>
              <div
                className="go-corner"
                style={{ backgroundColor: getCornerColor(index) }}
              ></div>
              <div className="bottom50">
                <h2>{post.title}</h2>
                <p>{post.college}</p>
                <div className="direction-box">
                  <button style={{ backgroundColor: getButtonColor(post.tag) }}>
                    {post.tag}
                  </button>
                </div>
                <p className="event-description">
                  {expandBody
                    ? post.description
                    : `${post.description?.slice(0, 80)}...`}
                  <button
                    className="learn-more-btn2"
                    onClick={() => handleLearnMore(post.number)}
                  >
                    <b>{expandBody ? "Read Less" : "Learn More"}</b>
                  </button>
                </p>
                <p>Hosted By: {post.owner}</p>
                <div className="start-end-div">
                  <p>Start Date: {post.start_date}</p>
                  <p>
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; End Date: {post.end_date}
                  </p>
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

import React, { useEffect, useState } from "react";
import "./stylesheet.css";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const HomePageV1 = () => {
  const [expandBody, setExpandBody] = useState(false);
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

  // const toggleExpand = () => {
  //   setExpandBody(!expandBody);
  // };

  const handleLearnMore = (number) => {
    navigate(`/events/${number}`);
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

  return (
    <div className="main-wrapper">
      <NavBar />
      <div className="container">
        <div className="first-section">
          {posts.map((post, index) => (
            <div className="cropped-1" key={index}>
              <a href="/">
                <img
                  src="https://kavyaschool.edu.np/images/Kavya-Ing.svg"
                  alt="Kavya School"
                />
              </a>
              <div className="top50"></div>
              <div className="bottom50">
                <h2>{post.title}</h2>
                <p>{post.college}</p>
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
                <p>
                  {expandBody
                    ? post.description
                    : `${post.description?.slice(0, 50)}...`}
                  <button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(post.number)}
                  >
                    <b>{expandBody ? "Read Less" : "Learn More"}</b>
                  </button>
                </p>
                <p>Hosted By: {post.owner}</p>
                <div className="start-end-div">
                  <p style={{ font: "10px" }}>
                    Date:&nbsp;&nbsp;{post.start_date}&nbsp; - &nbsp;{" "}
                    {post.end_date}
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

export default HomePageV1;

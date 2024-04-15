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
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?postId=1"
      );
      console.log(response.data);
      setPosts(response.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLearnMore = (id) => {
    navigate(`/events/${id}`);
    // /events/:eventsId
  };

  const getCornerColor = (postId) => {
    switch (postId) {
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
      <div className="container">
        <div className="color-div-section">
          {posts.map((post, index) => (
            //  <div className="color-div-card" key={index} style={{ backgroundColor: getCornerColor(post.id) }}>

            <div className="color-div-card" key={index}>
              <div
                className="go-corner"
                style={{ backgroundColor: getCornerColor(index) }}
              ></div>
              <div className="bottom50">
                <p>{post.id}</p>
                <br></br>
                <h2>{post.email}</h2>
                <div className="direction-box">
                  <button>{post.id}</button>
                  <button>hi</button>
                  <button>hi</button>
                </div>
                <p className="event-description">
                  {expandBody ? post.body : `${post.body?.slice(0, 55)}...`}
                  <button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(post.id)}
                  >
                    <b>{expandBody ? "Read Less" : "Learn More"}</b>
                  </button>
                </p>
                <p>Hosted By: {post.email}</p>
                <p>Date: {post.id}</p>
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

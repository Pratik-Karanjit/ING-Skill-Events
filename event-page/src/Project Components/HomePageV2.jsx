import React, { useEffect, useState } from "react";
import "./stylesheet.css";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import FooterOtherPages from "./FooterOtherPages";
import Skeleton from "react-loading-skeleton";

const HomePageV2 = () => {
  const [expandBody, setExpandBody] = useState(false);
  const [changeNavColor, setChangeNavColor] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hitApi();
  }, []);

  const hitApi = async () => {
    try {
      const response = await axios.get(
        "https://ing-skill-events.onrender.com/entry/events"
      );
      console.log(response.data);
      // Convert date formats before setting them into state
      const formattedPosts = response.data.result.map((post) => ({
        ...post,
        start_date: new Date(post.start_date).toLocaleDateString("en-US"),
        end_date: new Date(post.end_date).toLocaleDateString("en-US"),
      }));
      setPosts(formattedPosts);
      setLoading(false);
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
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div className="color-div-card skeleton-loading" key={index}>
                  <Skeleton height={20} count={10} />
                </div>
              ))
            : posts.map((post, index) => (
                <div className="color-div-card" key={index}>
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
                      {post?.tag.split(",").map((tag, index) => (
                        <button
                          key={index}
                          className="tag-button"
                          style={{ backgroundColor: getButtonColors([tag])[0] }}
                        >
                          {tag.trim()}
                        </button>
                      ))}
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
                        src={`https://ing-skill-events.onrender.com/${post.eventImage}`}
                        className="event-image"
                        // src={post.eventImage}
                        alt="Product"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <FooterOtherPages />
    </div>
  );
};

export default HomePageV2;

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
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?postId=1"
      );
      console.log(response.data);
      setPosts(response.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleExpand = () => {
  //   setExpandBody(!expandBody);
  // };

  const handleLearnMore = (id) => {
    navigate(`/events/${id}`);
    // /events/:eventsId
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
                <p>{post.id}</p>
                <br />
                <p>{post.email}</p>
                <div className="direction-box">
                  <button>{post.id}</button>
                  <button>hi</button>
                  <button>hi</button>
                </div>
                <p>
                  {expandBody ? post.body : `${post.body?.slice(0, 50)}...`}
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

export default HomePageV1;

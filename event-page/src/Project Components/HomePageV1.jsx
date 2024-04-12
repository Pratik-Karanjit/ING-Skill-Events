import React, { useEffect, useState } from "react";
import "./stylesheet.css";
import axios from "axios";
import NavBar from "./NavBar";

const HomePageV1 = () => {
  const [expandBody, setExpandBody] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    hitApi();
  }, []);

  let hitApi = async () => {
    try {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?postId=1"
      );
      setPosts(response.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = () => {
    setExpandBody(!expandBody);
  };

  return (
    <div className="main-wrapper">
      <NavBar />
      <div className="container">
        <div className="first-section">
          {posts?.map((post, index) => (
            <div className="cropped-1" key={index}>
              <a href="/">
                <img
                  src="https://kavyaschool.edu.np/images/Kavya-Ing.svg"
                  alt="Kavya School"
                />
              </a>
              <div className="top50"></div>
              <div className="bottom50">
                <p>{post.postId}</p>
                <br></br>
                <p>{post.email}</p>
                <div className="direction-box">
                  <button>{post.id}</button>
                  <button>hi</button>
                  <button>hi</button>
                </div>

                <p>
                  {expandBody ? post.body : `${post.body?.slice(0, 100)}...`}
                  <h4 onClick={toggleExpand} style={{ cursor: "pointer" }}>
                    {expandBody ? "Read Less" : "Learn More"}
                  </h4>
                </p>
                <p>Hosted By:{post.email}</p>
                <p>Date:{post.id}</p>
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

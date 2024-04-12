import React, { useEffect, useState } from "react";
import "./stylesheet.css";
import axios from "axios";

const HomePageV2 = () => {
  const [changeNavColor, setChangeNavColor] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 50) {
      setChangeNavColor(true);
    } else {
      setChangeNavColor(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  //   useEffect(() => {
  //     hitApi();
  //   }, []);

  //   let hitApi = async () => {
  //     try {
  //       let response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts"
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div className="main-wrapper">
      <div className={changeNavColor ? "navColor" : "header-section"}>
        <div className="header-item">
          <li>
            <a href="/">HOME</a>
          </li>
          <a href="/">
            <img
              src="https://kavyaschool.edu.np/images/Kavya-Ing.svg"
              alt="Kavya School"
            />
          </a>

          <a href="/contact">
            <button className="contact-btn">
              <b>CONTACT</b>
            </button>
          </a>
        </div>
      </div>

      <div className="color-div-section">
        <div className="color-div-card">
          <h3>This is option 1</h3>
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>
          <div class="go-corner" href="#"></div>
        </div>
        <div className="color-div-card">
          <h3>This is option 1</h3>
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>
          <div class="go-corner" href="#"></div>
        </div>
        <div className="color-div-card">
          <h3>This is option 1</h3>
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>
          <div class="go-corner" href="#"></div>
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

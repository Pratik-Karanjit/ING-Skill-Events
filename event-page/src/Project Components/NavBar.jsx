import React, { useState } from "react";
import "./stylesheet.css";

const NavBar = () => {
  const [changeNavColor, setChangeNavColor] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 50) {
      setChangeNavColor(true);
    } else {
      setChangeNavColor(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
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
        {/* 
        <a href="/contact">
          <button className="contact-btn">
            <b>CONTACT</b>
          </button>
        </a> */}
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";

const PictureSection = ({ info }) => {
  return (
    <section className="michal-background">
      <div className="main_info">
        <h1 className="logo-name animate-title">MICHAŁ POTRATZ</h1>
        <nav>
          <ul className="navbar">
            <li className="navbar_link">
              <Link to="/contact">Kontakt / Contact</Link>
            </li>
            <li className="navbar_link">
              <Link to="/about">O mnie / About me</Link>
            </li>
          </ul>
        </nav>
        <div className="icons mt-5">
          <a href={info.instaLink} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram instagram-icon"></i>
          </a>
          <a
            className="mr-2"
            href={info.youtubeLink}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-youtube youtube-icon"></i>
          </a>
          <a
            className="mr-2"
            href={info.linkedInLink}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin linkedin-icon"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PictureSection;

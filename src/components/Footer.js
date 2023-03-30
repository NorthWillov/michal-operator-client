import React from "react";

const Footer = ({ info }) => {
  return (
    <footer className="footer">
      <div className="icons">
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
      </div>
      <span className="copyright">© 2023 Michał Potratz</span>
    </footer>
  );
};

export default Footer;

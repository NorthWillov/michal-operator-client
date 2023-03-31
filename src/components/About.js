import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Container, Divider } from "@mui/material";

import Footer from "./Footer";
import { Link } from "react-router-dom";

const initialState = {
  email: "michaelpotratz@gmail.com",
  phone: "+48 570 437 760",
  instaLink: "https://instagram.com",
  youtubeLink: "https://www.youtube.com/@podrozebezkitu5651",
  about: "",
};

const About = () => {
  const [info, setInfo] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/getInfo");
        setIsLoading(false);
        setInfo(response.data);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="about">
        <Container>
          <h1 className="logo-name-pages">
            <Link to="/">MICHAŁ POTRATZ</Link>
          </h1>
          <h1 className="about_title">O mnie / About me</h1>
          <Divider light sx={{ background: "white" }} />
          <p dangerouslySetInnerHTML={{ __html: info.about }}></p>
        </Container>
      </div>
      <Footer info={info} />
    </>
  );
};

export default About;

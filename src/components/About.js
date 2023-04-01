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

  return (
    <>
      <div className="about">
        <Container>
<<<<<<< HEAD
          {!isLoading ? (
            <>
              <h1 className="logo-name-pages">
                <Link to="/">MICHAŁ POTRATZ</Link>
              </h1>
              <Typography variant="h1" style={useStyles.title}>
                O mnie / About me
              </Typography>
              <Divider light sx={{ background: "white" }} />
              <p dangerouslySetInnerHTML={{ __html: info.about }}></p>
            </>
          ) : (
            <Loader />
          )}
=======
          <h1 className="logo-name-pages">
            <Link to="/">MICHAŁ POTRATZ</Link>
          </h1>
          <h1 className="about_title">O mnie / About me</h1>
          <Divider light sx={{ background: "white" }} />
          <p dangerouslySetInnerHTML={{ __html: info.about }}></p>
>>>>>>> afc5acb5937d39952d5b642764a7b604b9d028cc
        </Container>
      </div>
      <Footer info={info} />
    </>
  );
};

export default About;

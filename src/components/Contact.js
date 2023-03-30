import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  Divider,
  CardContent,
} from "@mui/material";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const useStyles = {
  title: {
    marginBottom: "24px",
    marginLeft: "12px",
    textAlign: "left",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    marginTop: "40px",
    background: "transparent",
    color: "#fff",
    boxShadow: "none",
    padding: "0",
  },
  icon: {
    marginRight: "8px",
  },
};

const initialState = {
  email: "michaelpotratz@gmail.com",
  phone: "+48 570 437 760",
  instaLink: "https://instagram.com",
  youtubeLink: "https://www.youtube.com/@podrozebezkitu5651",
  about: "",
};

const Contact = () => {
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
          <Typography variant="h2" style={useStyles.title}>
            Skontaktuj się ze mną / Contact me
          </Typography>
          <Divider light sx={{ background: "white" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card style={useStyles.card}>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    Email
                  </Typography>
                  <Typography variant="h5" component="p">
                    <i className="fas fa-envelope" style={useStyles.icon}></i>
                    {info.email}
                  </Typography>
                </CardContent>
              </Card>
              <Card style={useStyles.card}>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    Phone
                  </Typography>
                  <Typography variant="h5" component="p">
                    <i className="fas fa-phone" style={useStyles.icon}></i>
                    {info.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={useStyles.card}>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    Media
                  </Typography>
                  
                  {/* Add your social media icons here */}
                  <div className="icons icons-contact">
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer info={info} />
    </>
  );
};

export default Contact;

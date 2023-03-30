import React, { useState, useEffect } from "react";
import PictureSection from "./PictureSection";
import BlogSection from "./BlogSection";
import Footer from "./Footer";
import axios from "axios";

const initialState = {
  email: "michaelpotratz@gmail.com",
  phone: "+48 570 437 760",
  instaLink: "https://instagram.com",
  youtubeLink: "https://www.youtube.com/@podrozebezkitu5651",
  about: "",
};

function Landing() {
  const [info, setInfo] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getInfo");
        setInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="landing">
      <PictureSection info={info} />
      <BlogSection />
      <Footer info={info} />
    </div>
  );
}

export default Landing;

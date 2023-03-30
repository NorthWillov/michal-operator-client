import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import Loader from "./Loader";
import PostTable from "./PostTable";
import EditInfoModal from "./EditInfoForm";

const cookies = new Cookies();

const initialInfoState = {
  email: "michaelpotratz@gmail.com",
  phone: "+48 570 437 760",
  instaLink: "https://instagram.com",
  youtubeLink: "https://www.youtube.com/@podrozebezkitu5651",
  about: "",
};

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [mediaType, setMediaType] = useState("picture");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postStatus, setPostStatus] = useState(null);
  const [info, setInfo] = useState(initialInfoState);
  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);

  const token = cookies.get("TOKEN");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newPost = { title, subtitle, mediaType, mediaUrl };

    axios
      .post("/posts", newPost, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("Post created successfully");
        setTitle("");
        setSubtitle("");
        setMediaType("picture");
        setMediaUrl("");
        setPostStatus("success");
      })
      .catch(() => {
        console.log("Failed to create post");
        setPostStatus("error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlEditInfoClose = () => {
    setIsEditInfoOpen(false);
  };

  const handleEditInfoOpen = () => {
    setIsEditInfoOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        padding: "50px 20%",
        minHeight: "100vh",
      }}
    >
      <Button
        variant="contained"
        color="warning"
        type="submit"
        sx={{ marginBottom: 2 }}
        onClick={handleEditInfoOpen}
      >
        Change Info About Myself
      </Button>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Create a new post
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Subtitle"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="mediaType-label">Media Type</InputLabel>
          <Select
            labelId="mediaType-label"
            label="Media Type"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <MenuItem value="picture">Picture</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Media URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        {postStatus === "success" && (
          <Typography variant="body1" color="green">
            Post created successfully
          </Typography>
        )}
        {postStatus === "error" && (
          <Typography variant="body1" color="red">
            Failed to create post
          </Typography>
        )}
      </form>

      <EditInfoModal
        info={info}
        onClose={handlEditInfoClose}
        isEditInfoOpen={isEditInfoOpen}
      />
      <PostTable />
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Cookies from "universal-cookie";
import Loader from "./Loader";

const cookies = new Cookies();

function EditPost({ postId, open, handleClose, handleSubmitClose }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = cookies.get("TOKEN");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { title, subtitle, mediaType, mediaUrl } = response.data;
        setTitle(title);
        setSubtitle(subtitle);
        setMediaType(mediaType);
        setMediaUrl(mediaUrl);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/posts/${postId}`,
        {
          title,
          subtitle,
          mediaType,
          mediaUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Post updated:", response.data);
      handleSubmitClose();
      // handle successful update
    } catch (error) {
      console.error("Error updating post:", error);
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        {isLoading && <Loader />}

        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="subtitle"
            label="Subtitle"
            margin="normal"
            fullWidth
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="media-type-label">Media Type</InputLabel>
            <Select
              labelId="media-type-label"
              id="media-type"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <MenuItem value="picture">Picture</MenuItem>
              <MenuItem value="video">Video</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="media-url"
            label="Media URL"
            margin="normal"
            fullWidth
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
          <Button type="submit">Save</Button>
        </form>
      </Box>
    </Modal>
  );
}

export default EditPost;

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress, // <-- Added loader component
} from "@mui/material";
import Cookies from "universal-cookie";
import EditForm from "./EditForm";

const cookies = new Cookies();

function PostTable() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currId, setCurrId] = useState("");
  const [loading, setLoading] = useState(true); // <-- State for loading indicator
  const token = cookies.get("TOKEN");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/posts-all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
        setLoading(false); // <-- Hide the loader once data is loaded
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleEdit = (id) => {
    setOpen(true);
    setCurrId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitClose = async () => {
    setLoading(true);
    setOpen(false);
    const getData = async () => {
      try {
        const res = await axios.get("/posts-all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
        setLoading(false); // <-- Hide the loader once data is loaded
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      // handle error
    }
  };

  return (
    <>
      {loading ? ( // <-- Show loader while data is being loaded
        <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
      ) : (
        <TableContainer style={{ marginTop: "60px" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEdit(post._id)}>Edit</Button>
                    <Button onClick={() => handleDelete(post._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {open && (
        <EditForm
          postId={currId}
          open={open}
          handleClose={handleClose}
          handleSubmitClose={handleSubmitClose}
        />
      )}
    </>
  );
}

export default PostTable;

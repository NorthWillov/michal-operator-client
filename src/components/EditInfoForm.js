import { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function EditInfoModal({ info, onClose, isEditInfoOpen }) {
  const [about, setAbout] = useState(info.about);
  const [email, setEmail] = useState(info.email);
  const [phone, setPhone] = useState(info.phone);
  const [instaLink, setInstaLink] = useState(info.instaLink);
  const [youtubeLink, setYoutubeLink] = useState(info.youtubeLink);
  const [linkedInLink, setLinkedInLink] = useState(info.linkedInLink);
  const token = cookies.get("TOKEN");

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleInstaLinkChange = (event) => {
    setInstaLink(event.target.value);
  };

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleLinkedInLinkChange = (event) => {
    setLinkedInLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `/editInfo`,
        {
          about,
          email,
          phone,
          instaLink,
          youtubeLink,
          linkedInLink,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={isEditInfoOpen}
      onClose={onClose}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TextField
          label="About"
          multiline
          rows={10}
          value={about}
          onChange={handleAboutChange}
        />
        <TextField label="Email" value={email} onChange={handleEmailChange} />
        <TextField label="Phone" value={phone} onChange={handlePhoneChange} />
        <TextField
          label="Instagram Link"
          value={instaLink}
          onChange={handleInstaLinkChange}
        />
        <TextField
          label="YouTube Link"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
        <TextField
          label="LinkedIn Link"
          value={linkedInLink}
          onChange={handleLinkedInLinkChange}
        />
        <Button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </Button>
      </form>
    </Modal>
  );
}

export default EditInfoModal;

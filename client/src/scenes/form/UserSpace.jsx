import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";


const UserSpace = () => {
  const { userData } = useSelector((state) => state.auth);

  return (
    <Box
      style={{
        border: "1px solid gray",
        backgroundColor: "rgba(255, 255, 255, 0.09)",
        borderRadius: "5px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "660px",
        height: "409px",
      }}
      className="font-face-gm"
    >
      <Typography variant="h3">   Nom d'utilisateur : {userData.userName}</Typography>
      <Divider variant="middle"/>
      <Typography variant="h3">  e-mail : {userData.email}</Typography>
      <Divider variant="middle"/>
    </Box>
  );
};

export default UserSpace;

import React, { useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const UserSpace = () => {
  const [userData, setUserData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "http://127.0.0.1:8080/user/getUserData/najimk",
        {
          method: "GET",
        }
      );
      const json = await data.json();
      if (Object.keys(json.response).length > 0) {
        setUserData(json.response);
      }
    };
    fetchData().catch(console.error);
  }, []);

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
      <Typography align="center" variant="h3">{userData.username}</Typography>
      <Divider variant="middle"/>
      <Typography align="center" variant="h3">{userData.email}</Typography>
      <Divider variant="middle"/>
    </Box>
  );
};

export default UserSpace;

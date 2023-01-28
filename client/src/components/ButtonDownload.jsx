import React, { useState } from "react";
import { Box, IconButton, Button } from "@mui/material";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
export default function ButtonDownload({handlerState}) {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isSelected, setIsSelected] = useState(false);

  const handleAddCalendar = async () => {
    const formData = new FormData();

    formData.append("calendar", selectedFile);
    await fetch("http://127.0.0.1:8080/calendar/addCalendar", {
      method: "POST",
      body: formData,
    })
    .then(async (result) => {
      result = await result.json()
      handlerState(result.vevent)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    setSelectedFile(undefined);
    setIsSelected(false);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleCalendarState = (data) => {
    handlerState(data)
  }

  return (
    <Box>
      <Button
        sx={{ ml: "2%" }}
        variant="contained"
        component="label"
        onChange={changeHandler}
      >
        Importer un calendrier
        <input hidden type="file" accept="text/calendar" name="calendar" />
      </Button>
      {isSelected ? (
        <IconButton onClick={handleAddCalendar}>
          <CloudDoneOutlinedIcon />
        </IconButton>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}

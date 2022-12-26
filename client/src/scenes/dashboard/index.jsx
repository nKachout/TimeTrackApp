import React from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box m="20px"></Box>);
}

export default Dashboard;
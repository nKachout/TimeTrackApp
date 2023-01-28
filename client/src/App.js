import "./App.css";
import Calendar from "./components/Calendar";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import BumpGraph from "./scenes/bump";
import Login from "./scenes/form/Login";
import Signin from "./scenes/form/Signin";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotificationToast from "./components/NotificationToast";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <NotificationToast />
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route exact path="/" element={<Login />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/timely" element={<PrivateRoute />}>
                <Route path="/timely/dashboard" element={<Dashboard />} />
                <Route path="/timely/calendar" element={<Calendar />} />
                <Route path="/timely/bump" element={<BumpGraph />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

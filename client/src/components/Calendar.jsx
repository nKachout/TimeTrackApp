import React, { useContext, useState, useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import ButtonDownload from "./ButtonDownload";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";

import AppointmentFormCustom from "./AppointmentFormCustom";

export default function Calendar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [schedulerData, setSchedulerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://127.0.0.1:8080/calendar/getCalendar", {
        method: "POST",
        body: JSON.stringify({ name: "edt.ics" }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await data.json();
      console.log(json.vevent);
      setSchedulerData(json.vevent);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div id="calendar">
      <Box
        sx={{
          "& .MuiTableCell-root": {
            borderRight: "none",
          },
          "& .MuiButtonBase-root": {
            color: colors.primary[200],
          },
          "& .Cell-highlightedText": {
            color: colors.blueAccent[600],
          },
        }}
      >
        <ButtonDownload />
        <Scheduler locale={"fr-FR"} data={schedulerData} firstDayOfWeek={1}>
          <ViewState />
          <EditingState />
          <IntegratedEditing />
          <WeekView startDayHour={7} endDayHour={22} displayName="Semaine" />
          <MonthView displayName="Mois" />
          <Appointments/>
          <Toolbar />
          <AppointmentFormCustom />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Box>
    </div>
  );
}

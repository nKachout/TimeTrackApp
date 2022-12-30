import React, { useContext, useState, useEffect, useCallback } from "react";
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
  AppointmentTooltip,
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
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [
    isAppointmentBeingCreated,
    setIsAppointmentBeingCreated,
  ] = React.useState(false);

  const onCommitChanges = useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          schedulerData.length > 0
            ? schedulerData[schedulerData.length - 1].id + 1
            : 0;
        console.log(added);
        setSchedulerData([...schedulerData, { id: startingAddedId, ...added }]);
        addEvent({ id: startingAddedId, ...added });
      }
      if (changed) {
        updateEvent(changed);
        setSchedulerData(
          schedulerData.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setSchedulerData(
          schedulerData.filter((appointment) => {
            if (appointment.id !== deleted) {
              return true;
            } else {
              deleteEvent(appointment);
              return false;
            }
          })
        );
      }
      setIsAppointmentBeingCreated(false);
    },
    [setSchedulerData, setIsAppointmentBeingCreated, schedulerData]
  );
  
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://127.0.0.1:8080/calendar/getCalendar", {
        method: "POST",
        body: JSON.stringify({ name: "edt.ics" }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await data.json();
      if (json.vevent.length > 0) {
        setSchedulerData(json.vevent);
      }
    };
    fetchData().catch(console.error);
  }, []);

  let addEvent = (added) => {
    const fetchData = async () => {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000;
      delete added.allDay;
      added.startDate = new Date(added.startDate - tzoffset).toISOString(true);
      added.endDate = new Date(added.endDate - tzoffset).toISOString(true);
      const data = await fetch(
        "http://127.0.0.1:8080/calendar/addEvent",
        {
          method: "POST",
          body: JSON.stringify({ event: added }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await data.json();
      console.log(json);
    };
    fetchData().catch(console.error);
  };

  let deleteEvent = (deleted) => {
    const fetchData = async () => {
      delete deleted.allDay;
      console.log(deleted);
      const data = await fetch(
        "http://127.0.0.1:8080/calendar/deleteEvent",
        {
          method: "DELETE",
          body: JSON.stringify({event: deleted}),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await data.json();
      console.log(json.response);
    };
    fetchData().catch(console.error);
  };

  let updateEvent = (updated) => {
    const fetchData = async () => {
      let updatedTemp = JSON.parse(JSON.stringify(updated))
      if(updatedTemp[Object.keys(updatedTemp)[0]].hasOwnProperty('notes')){
        delete Object.assign(updatedTemp[Object.keys(updatedTemp)[0]], {description: updatedTemp[Object.keys(updatedTemp)[0]].notes})['notes'];
      }
      if(updatedTemp[Object.keys(updatedTemp)[0]].hasOwnProperty('title')){
        delete Object.assign(updatedTemp[Object.keys(updatedTemp)[0]], {summary: updatedTemp[Object.keys(updatedTemp)[0]].title})['title'];
      }
      console.log(updatedTemp)
      const data = await fetch(
        "http://127.0.0.1:8080/calendar/updateEvent",
        {
          method: "POST",
          body: JSON.stringify({event: updatedTemp}),
          headers: { "Content-Type": "application/json" },
        }
      );
    };
    fetchData().catch(console.error);
  };

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
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <IntegratedEditing />
          <WeekView startDayHour={7} endDayHour={22} displayName="Semaine" />
          <MonthView displayName="Mois" />
          <Appointments />
          <Toolbar />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentFormCustom />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Box>
    </div>
  );
}

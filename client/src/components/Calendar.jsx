import React from "react";
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
  AppointmentForm,
  ViewSwitcher,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";

export default function Calendar() {
  const [schedulerData, setSchedulerData] = React.useState();
React.useEffect(() => {
    const fetchData = async () => {
        const data = await fetch("http://127.0.0.1:8080/calendar/getCalendar", {
            method: "POST",
            body: JSON.stringify({ name: "edt_.ics" }),
            headers: { 'Content-Type': 'application/json' }
          })
        const json = await data.json();
        console.log(json.vevent);
        setSchedulerData(json.vevent);
      }
      fetchData().catch(console.error);
  }, []);
  return (
    <div id="calendar">
      <Scheduler locale={"fr-FR"} data={schedulerData} firstDayOfWeek={1}>
        <ViewState />
        <EditingState />
        <IntegratedEditing />
        <WeekView />
        <MonthView />
        <Appointments />
        <AppointmentForm/>
        <Toolbar/>
        <ViewSwitcher/>
      </Scheduler>
    </div>
  );
}

export function addEvent(added) {
  const fetchData = async () => {
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    delete added.allDay;
    added.startDate = new Date(added.startDate - tzoffset).toISOString(true);
    added.endDate = new Date(added.endDate - tzoffset).toISOString(true);
    const data = await fetch("http://127.0.0.1:8080/calendar/addEvent", {
      method: "POST",
      body: JSON.stringify({ event: added }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await data.json();
    console.log(json);
  };
  fetchData().catch(console.error);
}

export function deleteEvent(deleted) {
  const fetchData = async () => {
    delete deleted.allDay;
    console.log(deleted);
    const data = await fetch("http://127.0.0.1:8080/calendar/deleteEvent", {
      method: "DELETE",
      body: JSON.stringify({ event: deleted }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await data.json();
    console.log(json.response);
  };
  fetchData().catch(console.error);
}

export function updateEvent(updated) {
  const fetchData = async () => {
    let updatedTemp = JSON.parse(JSON.stringify(updated));
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    let changes = updatedTemp[Object.keys(updatedTemp)[0]];
    if (changes.hasOwnProperty("notes")) {
      delete Object.assign(changes, {
        description: changes.notes,
      })["notes"];
    }
    if (changes.hasOwnProperty("title")) {
      delete Object.assign(changes, {
        summary: changes.title,
      })["title"];
    }
    if (changes.hasOwnProperty("startDate")) {
      delete Object.assign(changes, {
        dtstart: new Date(new Date(changes.startDate) - tzoffset).toISOString(
          true
        ),
      })["startDate"];
    }
    if (changes.hasOwnProperty("endDate")) {
      delete Object.assign(changes, {
        dtend: new Date(new Date(changes.endDate) - tzoffset).toISOString(true),
      })["endDate"];
    }
    const data = await fetch("http://127.0.0.1:8080/calendar/updateEvent", {
      method: "POST",
      body: JSON.stringify({ event: updatedTemp }),
      headers: { "Content-Type": "application/json" },
    });
  };
  fetchData().catch(console.error);
}

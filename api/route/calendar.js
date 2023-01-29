// Importing modules
const express = require("express");
const ical = require("ical.js");
const router = express.Router();
// Importing User Schema
const User = require("../model/user");
const formidable = require("formidable");
const path = require("path");
const Binary = require("mongodb").Binary;
const fs = require("fs");
const auth = require("./auth");
var ObjectId = require("mongodb").ObjectID;

function Calendar(_name, _size, _content) {
  this.calendar_name = _name;
  this.size = _size;
  this.content = _content;
  this.date = new Date().toISOString();
}

function Evt(event) {
  this.title = event.getFirstPropertyValue("summary");
  this.notes = event.getFirstPropertyValue("description");
  this.startDate = event
    .getFirstPropertyValue("dtstart")
    .toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  this.endDate = event
    .getFirstPropertyValue("dtend")
    .toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  this.id = event.getFirstPropertyValue("uid");
  this.location = event.getFirstPropertyValue("location");
}

router.post("/addCalendar", auth, async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.parse(req, async (err, fields, files) => {
    if (!err) {
      var data = fs.readFileSync(files.calendar.filepath);
      let newCalendar = new Calendar(
        "edt.ics",
        files.calendar.size,
        Binary(data)
      );
      User.updateOne(
        { _id: req.user },
        { $push: { calendars: newCalendar } }
      ).then((x) => {
        data = Buffer.from(data,"binary").toString();
        let events = ical.parse(data);
        var comp = new ical.Component(events);
        var vevent = comp.getAllSubcomponents("vevent");
        vevent = vevent.map((x) => new Evt(x));
        res.send({ message: "Ajouté avec succés", vevent });
      });
    } else {
      console.log(err);
    }
  });
});

router.get("/getAllCalendars", auth, async (req, res) => {
  let result = await User.find(
    { _id: req.user },
    { calendars: 1 }
  );
  res.send({ calendars: result });
});

router.post("/getCalendar", auth, async (req, res) => {
  let calendar_data = await getCalendarData(
    req.user,
    req.body.name
  );
  if (calendar_data == null) {
    res.send({ message: "Calendrier introuvable" });
  } else {
    let events = ical.parse(calendar_data);
    var comp = new ical.Component(events);
    var vevent = comp.getAllSubcomponents("vevent");
    vevent = vevent.map((x) => new Evt(x));
    res.send({ vevent });
  }
});

router.post("/addEvent", auth, async (req, res, next) => {
  let calendar_data = await getCalendarData(
    req.user,
    "edt.ics"
  );
  var comp = new ical.Component(ical.parse(calendar_data));
  var vevent = new ical.Component("vevent"),
    event = new ical.Event(vevent);
  event.description = req.body.event.notes;
  event.summary = req.body.event.title;
  event.uid = req.body.event.id;
  event.startDate = ical.Time.fromString(req.body.event.startDate);
  event.endDate = ical.Time.fromString(req.body.event.endDate);
  comp.addSubcomponent(vevent);
  let eventsNew = Buffer.from(comp.toString(), "utf8");
  User.updateOne(
    { _id: ObjectId("63468c2b85c7c92acc2da910") },
    { $set: { "calendars.0.content": eventsNew } }
  ).then((x) => {
    res.send({ message: "Ajouté avec succés" });
  });
});

router.delete("/deleteEvent", auth, async (req, res, next) => {
  let calendar_data = await getCalendarData(
    req.user,
    "edt.ics"
  );
  let events = ical.parse(calendar_data);
  var comp = new ical.Component(events);
  let foundEvent = comp
    .getAllSubcomponents("vevent")
    .find((event) => event.getFirstPropertyValue("uid") === req.body.event.id);
  comp.removeSubcomponent(foundEvent);
  let eventsNew = Buffer.from(comp.toString(), "utf8");
  User.updateOne(
    { _id: ObjectId("63468c2b85c7c92acc2da910") },
    { $set: { "calendars.0.content": eventsNew } }
  ).then((x) => {
    res.send({ response: "Supprimé avec succés" });
  });
});

router.post("/updateEvent", auth, async (req, res, next) => {
  let calendar_data = await getCalendarData(
    req.user,
    "edt.ics"
  );
  let events = ical.parse(calendar_data);
  var comp = new ical.Component(events);
  comp.getAllSubcomponents("vevent").map((event) => {
    if (event.getFirstPropertyValue("uid") === Object.keys(req.body.event)[0]) {
      let changes = req.body.event[Object.keys(req.body.event)[0]];
      Object.keys(changes).forEach((change) => {
        if(change === "startDate" || change === "endDate"){
          changes[change] = ical.Time.fromString(changes[change]);
        }
        event.updatePropertyWithValue(change, changes[change]);
      });
    }
    return event;
  });
  let eventsNew = Buffer.from(comp.toString(), "utf8");
  User.updateOne(
    { _id: ObjectId("63468c2b85c7c92acc2da910") },
    { $set: { "calendars.0.content": eventsNew } }
  ).then((x) => {
    res.send({ response: "Supprimé avec succés" });
  });
});

let getCalendarData = async (userId, calendarName) => {
  let result = await User.findOne(
    {
      _id: userId,
      "calendars.calendar_name": calendarName,
    },
    { "calendars.$": 1 }
  );
  if (result == null) {
    return null;
  }
  let calendar_data = Buffer.from(
    result.calendars[0].content.value(true),
    "binary"
  ).toString();
  return calendar_data;
};
// Export module to allow it to be imported in other files
module.exports = router;

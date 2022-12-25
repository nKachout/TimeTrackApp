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
var ObjectId = require("mongodb").ObjectID;

function Calendar(_name, _size, _content) {
  this.calendar_name = _name;
  this.size = _size;
  this.content = _content;
  this.date = new Date().toISOString();
}

function Evt(event) {
  this.title = event.getFirstPropertyValue("summary");
  this.startDate = event
    .getFirstPropertyValue("dtstart")
    .toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  this.endDate = event
    .getFirstPropertyValue("dtend")
    .toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  this.id = event.getFirstPropertyValue("uid");
  this.location = event.getFirstPropertyValue("location");
}

router.post("/addCalendar", async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.parse(req, async (err, fields, files) => {
    if (!err) {
      var data = fs.readFileSync(files.calendar.filepath);
      let newCalendar = new Calendar(
        files.calendar.originalFilename,
        files.calendar.size,
        Binary(data)
      );
      User.updateOne(
        { _id: ObjectId("63468c2b85c7c92acc2da910") },
        { $push: { calendars: newCalendar } }
      ).then((x) => {
        res.send({ message: "Ajouté avec succés" });
      });
    } else {
      console.log(err);
    }
  });
});

router.get("/getAllCalendars", async (req, res) => {
  console.log("Calendar GET");
  let result = await User.find(
    { _id: ObjectId("63468c2b85c7c92acc2da910") },
    { calendars: 1 }
  );
  res.send({ calendars: result });
});

router.post("/getCalendar", async (req, res) => {
  let result = await User.findOne(
    {
      _id: ObjectId("63468c2b85c7c92acc2da910"),
      "calendars.calendar_name": req.body.name,
    },
    { "calendars.$": 1 }
  );
  let calendar_data = Buffer.from(
    result.calendars[0].content.value(true),
    "binary"
  ).toString();
  let events = ical.parse(calendar_data);
  var comp = new ical.Component(events);
  var vevent = comp.getAllSubcomponents("vevent");
  vevent = vevent.map((x) => new Evt(x));
  res.send({ vevent });
});
// Export module to allow it to be imported in other files
module.exports = router;

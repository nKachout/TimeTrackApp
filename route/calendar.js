// Importing modules
const express = require("express");
const { db } = require("../model/calendar");
const router = express.Router();
// Importing User Schema
const Calendar = require("../model/calendar");
const formidable = require("formidable");
const path = require("path");
const Binary = require("mongodb").Binary;
const fs = require('fs');

router.post('/setCalendari', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 50 * 1024 * 1024; // 5MB
    form.parse(req, async (err, fields, files) => {
      console.log(files.calendar.filepath);
        var data = fs.readFileSync(files.calendar.filepath);
        var insert_data = {};
        insert_data.file_data= Binary(data);
        let newCalendar = new Calendar();
        newCalendar.calendar_content = data;
        console.log(insert_data);
        console.log(newCalendar);
        newCalendar.save((err, Calendar) => {
            if (err) {
              return res.status(400).send({
                message: "Failed to set calendar.",
              });
            } else {
              return res.status(201).render("index.ejs", {
                message: "Calendar successfully added !",
              });
            }
          });
    });
});
// Export module to allow it to be imported in other files
module.exports = router;

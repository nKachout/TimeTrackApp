// Importing modules
const express = require("express");
const router = express.Router();
// Importing User Schema
const User = require("../model/user");
const formidable = require("formidable");
const path = require("path");
const Binary = require("mongodb").Binary;
const fs = require("fs");
var ObjectId = require('mongodb').ObjectID;

function Calendar(_name,_size,_content){
  this.calendar_name = _name;
  this.size = _size;
  this.content = _content;
  this.date = new Date().toISOString();
};

router.post("/addCalendar", (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.parse(req, async (err, fields, files) => {
    console.log(files.calendar);
    var data = fs.readFileSync(files.calendar.filepath);
    let newCalendar = new Calendar(files.calendar.originalFilename,files.calendar.size,Binary(data));
    console.log(newCalendar);
    User.updateOne( 
      { _id : ObjectId('63468c2b85c7c92acc2da910') },
      { $push: { calendars : newCalendar } }
    ).then(x=>{
      console.log(x);
      res.render('index.ejs',{message : "Ajouté avec succés"});
    });
  });
});

router.get('/getAllCalendars', async (req, res) => {
  console.log("Calendar GET");
  let result = await User.find({ _id: ObjectId('63468c2b85c7c92acc2da910') },{calendars : 1});
  res.send({ calendars : result});
});

router.get('/getCalendar', async (req, res) => {
  let result = await User.findOne({ _id: ObjectId('63468c2b85c7c92acc2da910'), "calendars.calendar_name" : req.body.name },{'calendars.$':1});
  console.log(result.calendars[0].content.value(true));
  fs.writeFile(result.calendars[0].calendar_name,result.calendars[0].content.value(true), function(err){
    if (err) throw err;
    console.log('Sucessfully saved!');
  });
  res.send({ calendar : result.calendars});
});
// Export module to allow it to be imported in other files
module.exports = router;
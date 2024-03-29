console.log("index.js: début");

const http = require("http");
const mongoose = require("mongoose");
var lien_mongoDB = "mongodb://127.0.0.1/timetracking";
mongoose.connect(lien_mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var express = require("express");
const { strictEqual } = require("assert");
const { Console } = require("console");
const cors = require("cors");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.set("views", path.join(__dirname, "/views"));
// set the view engine to ejs
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: '6mb' }));
const dot = require("dotenv").config();
// Tous les fichiers qui seront dans le dossier /public seront directement accessible
// Par exemple, si il y a un fichier image.jpeg dans notre dossier public, il sera accessible via le lien /image.jpeg
app.use("/public", express.static("static"));

const user = require("./route/user.js");
const calendar = require("./route/calendar.js");
app.use("/user", user);
app.use("/calendar", calendar);
const server = require("http").createServer(app);
server.listen(8080, () => {
  console.log("server.listen(8080)");
});

console.log("index.js: fin");

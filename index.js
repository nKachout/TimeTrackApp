console.log('index.js: début');

const http = require('http');
const mongoose = require('mongoose');
var lien_mongoDB = 'mongodb://127.0.0.1/timetracking';
mongoose.connect(lien_mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Définition d'un Schema / d'une collection
var Schema = mongoose.Schema;
var TestTable = new Schema({
    id: Number,
    message: String,
    //date: Date,
  });

  var TestTable = mongoose.model('TestTable', TestTable);
  var test = new TestTable({ id: 0,message : "Test" });
    // Enregistrer le nouvel utilisateur dans la base de données MongoDB
    test.save(function (err) {
    if (err) return handleError(err);
    // saved!
    });

var express = require('express');
const { strictEqual } = require('assert');
var app = express();
app.set('views', __dirname + '/views');
// set the view engine to ejs
app.set('view engine', 'ejs');
// Tous les fichiers qui seront dans le dossier /public seront directement accessible
// Par exemple, si il y a un fichier image.jpeg dans notre dossier public, il sera accessible via le lien /image.jpeg
app.use('/', express.static('public'));

app.get('/home', function (req, res) {
    res.render('index.ejs', { ma_variable : "NAJIM" });
});

const server = require('http').createServer(app);
server.listen(8080, () => {
    console.log('server.listen(8080)');
  });
  console.log('index.js: fin');
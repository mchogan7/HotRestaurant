var express = require('express');
var app = express();
var PORT = 1234;
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "hotrestaurant_db"
});

// checkOpenTable()

function checkOpenTable() {
    connection.query('SELECT * FROM alltables WHERE available = TRUE LIMIT 1', function(error, results, fields) {
        if (error) throw error
        if (results) {
            console.log(results)
        } else {
            //Send this info back to page.
            console.log('No Tables')
        }
	});
}

////////////         ROUTES        ////////////////////


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.listen(3000);

app.get("/tables", function (req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function (req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;

  console.log(newReservation);

// connection.query("UPDATE alltables SET ? WHERE ?", function(err, res) { });

connection.connect(function(err) {
	if (err) throw err;
});
  // We then display the JSON to the users
  res.json(newReservation);
});
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



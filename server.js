var express = require('express');
var app = express();
var PORT = 1234;
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

/*
========================================================
////////////         ROUTES        ////////////////////
========================================================
*/
app.get('/', function (req, res) {
  res.send('{Hello World}');
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


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

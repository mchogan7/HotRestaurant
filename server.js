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

app.use(express.static(path.join(__dirname,'assets')));

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "hotrestaurant_db"
});

////////////         ROUTES        ////////////////////


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.listen(3000);

app.get("/tables", function (req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

// app.get("/frontEnd.js", function(req, res) {
//   res.sendFile(path.join(__dirname, "assets/frontEnd.js"));	
// });

app.get("/reserve", function (req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function (req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/allTables", function (req, res) {
	sendAll(res);
});

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;

  // console.log(newReservation);

// connection.query("UPDATE alltables SET ? WHERE ?", function(err, res) { });

connection.connect(function(err) {

});
checkOpenTable(newReservation)

  res.json(newReservation);
});
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


function checkOpenTable(resObject) {
    connection.query('SELECT * FROM alltables WHERE available = 1 LIMIT 1', function(error, results, fields) {
    	console.log(results)
      	if (results.length > 0) {
            reserveTable(results[0].table_id, resObject)
        } else {
            //Send this info back to page.
            console.log('Wait Listed!')
            reserveTable(results.length, resObject)
        }
	});
}

function reserveTable(tableID, resObject){
	console.log(tableID)
	console.log(resObject)
connection.query('UPDATE hotrestaurant_db.alltables SET reserve_name = ?, available = 0, email = ?, phone = ?, reserve_id = ? WHERE table_id = ?', [resObject.customerName, resObject.customerEmail, resObject.phoneNumber, resObject.customerID, tableID], function(error, results, fields) {
    });
}

function sendAll(res){
	    connection.query('SELECT * FROM alltables', function(error, results, fields) {
    	res.json(results);
	})
}




var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "hotrestaurant_db"
});

checkOpenTable()

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


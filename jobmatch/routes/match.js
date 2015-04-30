var sqlite3 = require('sqlite3').verbose();
var jsonQuery = require('json-query');
var jsonData = require('../public/course2.json');

exports.db = function(req, res) {
	var db = new sqlite3.Database('./db_1.sqlite');
	var data = { 'courseNo' : jsonData };
	var course = jsonQuery("courseNo[index=" + req.params.content+ "].id", { data: data }).value;
	console.log(course);
	 db.serialize(function() {
	 	db.all("SELECT keyword FROM keywordID WHERE course =?",course, function(err, rows) {
	 		console.log(rows);
	 		res.send(rows);
	 	});

	 });
	//res.send(toString(course));
};
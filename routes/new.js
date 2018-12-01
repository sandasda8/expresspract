var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var currentTime = new Date().toISOString().slice(0, 10);
var isDone = "false";
var fileRoute = "emty.pdf";
var note = "Írj ide valamit...";

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Pass1@pass',
	database: 'robins'
});

router.get('/', function (req, res, next) {
	res.render('new', {
		title: 'Új Bejegyzés',
		layout: 'newLayout'
	});
});

router.post('/insert', function (req, res, next) {
	console.log(currentTime.toString);
	connection.query("INSERT INTO tickets (workNumber, shortNote, note, timeStamp, uploadRoute, isDone) VALUES (?, ?, ?, ?, ?, ?)",
		[req.body.workNumber, req.body.shortNote, note, currentTime, fileRoute, isDone],
		function (err, row, field) {
			res.redirect('/list');
		});
});

module.exports = router;
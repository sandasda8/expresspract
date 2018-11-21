var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Pass1@pass',
	database: 'robins'
});

router.get('/', function (req, res) {
	var totalTrue = [];
	var totalFalse = [];
	connection.query("SELECT * FROM tickets", function (err, row, field) {
		for (i = 0; i < row.length; i++) {
			if (row[i].isDone == "false") {
				totalFalse.push(row[i]);
			} else {
				totalTrue.push(row[i]);
			}
		}
		res.render('list', { title: 'Bejegyzések', layout: 'listLayout', trueRow: totalTrue, falseRow: totalFalse });
	})
});

router.get('/:idNumber', function (req, res) {
	var idNum = req.params['idNumber'];
	connection.query("SELECT * FROM tickets where id = ?", [idNum], function (err, row, field) {
		console.log(row[0].isDone);
		if (row[0].isDone === "false") {
			connection.query("UPDATE tickets SET isDone = ? WHERE id = ?",
			["true", idNum], function (err, row2, field) {
				res.redirect('/list');
			});
		} else {
			connection.query("UPDATE tickets SET isDone = ? WHERE id = ?",
			["false", idNum], function (err, row2, field) {
				res.redirect('/list');
			});
		}
	});
});

router.post('/search', function (req, res) {
	console.log(req.body.search);
	connection.query("SELECT * FROM tickets WHERE workNumber = ?", [req.body.search], function (err, row, field) {
		res.render('edit', { title: 'Szerkesztés', layout: 'editLayout', record: row });
	});
});

module.exports = router;
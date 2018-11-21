var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Pass1@pass',
	database: 'robins'
});

router.get('/images/:imageName', function (req, res) {
	var image = req.params['imageName'];
	res.sendFile('/home/sanda/Desktop/testapp/public/images/' + image);
});

router.get('/:idSelect', function (req, res) {
var idParam = req.params['idSelect'];
var total = 0;
connection.query("SELECT * FROM tickets WHERE id = ?", [idParam], function (err, row, field) {
		connection.query("SELECT * FROM expenses WHERE workId = ?", [idParam], function (err, row2, field) {
			for (i = 0; i < row2.length; i++) {
				total += row2[i].value;
			}
			res.render('edit', { title: 'Szerkesztés', layout: 'editLayout', record: row, expenses: row2, total });
		});
	});
});

router.get('/delete/:delParam', function (req, res) {
	var delParam = req.params['delParam'];
	connection.query("DELETE FROM tickets WHERE id = ?", [delParam], function (err, row, field) {
		connection.query("DELETE FROM expenses WHERE workId = ?", [delParam], function (err, row, field) {
			res.redirect('/list');
		});
	});
});

router.get('/deleteValue/:delParam', function (req, res) {
	var delParam = req.params['delParam'];
	var temp;
	connection.query("SELECT * FROM expenses WHERE id = ?", [delParam], function (err, row, field) {
		temp = row[0].workId;
		connection.query("DELETE FROM expenses WHERE id = ?", [delParam], function (err, row2, field) {
			res.redirect('/edit/' + temp);
		});
	});
});

router.post('/workname/:idSelect', function (req, res) {
	var idParam = req.params['idSelect'];
	connection.query("UPDATE tickets SET workNumber = ? WHERE id = ?", [req.body.workNumber, idParam], function (err, row, field) {
			res.redirect('/edit/' + idParam);
	});
});

router.post('/shortNote/:idSelect', function (req, res) {
	var idParam = req.params['idSelect'];
	connection.query("UPDATE tickets SET shortNote = ? WHERE id = ?", [req.body.shortNote, idParam], function (err, row, field) {
			res.redirect('/edit/' + idParam);
	});
});

router.post('/note/:idSelect', function (req, res) {
	var idParam = req.params['idSelect'];
	connection.query("UPDATE tickets SET note = ? WHERE id = ?", [req.body.note, idParam], function (err, row, field) {
			res.redirect('/edit/' + idParam);
	});
});

router.post('/timeStamp/:idSelect', function (req, res) {
	var idParam = req.params['idSelect'];
	connection.query("UPDATE tickets SET timeStamp = ? WHERE id = ?", [req.body.timeStamp, idParam], function (err, row, field) {
			res.redirect('/edit/' + idParam);
	});
});

router.post('/upload', function (req, res) {
	if (req.files.imgFile != null) {
		req.files.imgFile.mv('/home/sanda/Desktop/testapp/public/images/' + req.files.imgFile.name);
		connection.query("UPDATE tickets SET uploadRoute = ? WHERE id = ?",
		[req.files.imgFile.name, req.body.workId], function (err, row, field) {
			res.redirect('/edit/' + req.body.workId);
		});
	} else {
		res.redirect('/edit/' + req.body.workId);
	}
});

router.post('/updateCalculator', function (req, res) {
	connection.query("INSERT INTO expenses (workId, value, spentFor) VALUES ( ?, ?, ? )",
	[req.body.workId, req.body.value, req.body.spentFor], function (err, row, field) {
		res.redirect('/edit/' + req.body.workId);
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('login', { title: 'Login', layout: 'loginLayout' });
});

router.get('/coverImage', function(req, res, next){
	res.sendFile('/home/sanda/Desktop/testapp/public/images/cover.jpg')
});

router.post('/login', function(req, res, next) {
	var name = req.body.username;
	var pass = req.body.password;
	console.log(name + " " + pass);
	if (name === "robin" && pass === "1234") {
		res.redirect('/list' );
	} else {
		res.redirect('/');
	}
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('login', { title: 'Login', layout: 'loginLayout' });
});

router.get('/image/:which', function(req, res, next){
	var which = req.params['which'];
	res.sendFile('/home/sanda/Desktop/testapp/public/images/'+which);
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

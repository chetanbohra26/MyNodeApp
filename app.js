var express = require('express');
var { Client } = require('pg');
var bodyParser = require('body-parser')
var userSelect = require('./scripts/select');
var userLogin = require('./scripts/login');
var userRegister = require('./scripts/register');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

const port = process.env.PORT || 6969;

const conStr = process.env.DATABASE_URL;

const client = new Client({
	connectionString: conStr,
	ssl: true,
	rejectUnauthorized: false
});

client.connect(function (err) {
	try {
		if (err) throw err;
		console.log('Connected to database');
	} catch (error) {
		console.log('Error : %s', error);
	}
});

app.post('/user', function (req, res) {
	let user = req.body.user;
	if (!user) {
		res.send('Incomplete data');
		return;
	}
	console.log('Received parameter user : %s', user);
	userSelect.selectTable(res, client, user);
});

app.post('/login', function (req, res) {
	let mail = req.body.mail;
	let pass = req.body.pass;
	if (!mail || !pass) {
		res.send('Incomplete data');
		return;
	}
	console.log('Received parameter mail : %s and pass of length: %d', mail, pass.length);
	userLogin.checkLogin(res, client, mail, pass);
});

app.post('/register', function (req, res) {
	let mail = req.body.mail;
	let name = req.body.name;
	let pass = req.body.pass;
	if (!mail || !name || !pass) {
		res.send('Incomplete data');
		return;
	}
	console.log('Received parameter mail : %s and name : %s and pass of length : %d', mail, name, pass.length);
	userRegister.insertTable(res, client, mail, name, pass);
});

app.listen(port);
console.log('Listening on port %s', port);

var express = require('express');
var { Client } = require('pg');
var userSelect = require('./scripts/select');
var userLogin = require('./scripts/login');
var userRegister = require('./scripts/register');

var app = express();

const port = process.env.PORT || 6969;

const conStr = process.env.DATABASE_URL || 'postgres://kckhzihgigctnf:138cfc5a9c1476cb711e8d49649d50f3a313b966266ffe6644475df8c027f7d2@ec2-3-213-192-58.compute-1.amazonaws.com:5432/df5lb9h3l32bm9';

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
		console.log('Error : ' + error);
	}
});

app.get('/user', function (req, res) {
	let user = req.query.user;
	console.log('Received parameter user : ' + req.query.id);
	userSelect.selectTable(res, client, user);
});

app.get('/login', function (req, res) {
	let mail = req.query.mail;
	let pass = req.query.pass;
	console.log('Received parameter mail : ' + mail + ' and pass : ' + pass);
	if (!mail || !pass) {
		res.send('Incomplete data');
		return;
	}
	userLogin.checkLogin(res, client, mail, pass);
});

app.post('/register', function (req, res) {
	let mail = req.query.mail;
	let name = req.query.name;
	let pass = req.query.pass;
	console.log('Received parameter mail : ' + mail + ' and name : ' + name + ' and pass : ' + pass);

	if (!mail || !name || !pass) {
		res.send('Incomplete data : ' + req.query);
		return;
	}
	userRegister.insertTable(res, client, mail, name, pass);
});

app.listen(port);
console.log('Listening on port ' + port);


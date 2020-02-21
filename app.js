var express = require('express');
var { Client } = require('pg');
var userSelect = require('./scripts/select');
var userLogin = require('./scripts/login')

var app = express();

const port = process.env.PORT || 4200;
const conStr = process.env.DATABASE_URL;
//const conStr = "postgres://kckhzihgigctnf:138cfc5a9c1476cb711e8d49649d50f3a313b966266ffe6644475df8c027f7d2@ec2-3-213-192-58.compute-1.amazonaws.com:5432/df5lb9h3l32bm9";

const client = new Client({
	connectionString: conStr,
	ssl: true,
	rejectUnauthorized: false
});

client.connect(function (err) {
	if (err) throw err;
	console.log('Connected to database');
});

app.get('/user', function (req, res) {
	userSelect.selectTable(res, client);
	console.log('Connected user : ' + req.query.id);
});

app.get('/login', function (req, res) {
	console.log('Connected login : ' + JSON.stringify(req.query));
	let mail = req.query.mail;
	let pass = req.query.pass;
	console.log("mail = " + mail + " and pass = " + pass);
	userLogin.checkLogin(res, client, mail, pass);
});

app.listen(port);
console.log('Listening on port ' + port);


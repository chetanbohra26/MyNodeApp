var express = require('express');
var {Client} = require('pg');

var app = express();

const port = process.env.PORT || 3000;
const conStr = process.env.DATABASE_URL ||"postgres://kckhzihgigctnf"+":"
		+"138cfc5a9c1476cb711e8d49649d50f3a313b966266ffe6644475df8c027f7d2@ec2-3-213-192-58.compute-1.amazonaws.com"+":"
		+"5432/df5lb9h3l32bm9";

const client = new Client({
	connectionString: conStr,
	ssl:true,
	rejectUnauthorized: false
});

app.get('/',function(req,res){
	//res.send("Hello..!");
	selectTable(res);
}).listen(port);
console.log('Listening on port' + port);

client.connect(function(err){
	if(err)	throw err;
	console.log('Connected to database');
});

const selectTable = function(res){
	console.log("Check");
		let selectQuery = "select * from Users;";
		//console.log(selectQuery);
		client.query(selectQuery,function(err,result){
			if(err)	throw err;
			//console.log(result.rows);
			res.send(JSON.stringify(result.rows));
			//res.end(JSON.stringify(result.rows));
		});
}

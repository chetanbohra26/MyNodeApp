exports.selectTable = function (res, client) {
	let selectQuery = "select * from Users;";
	console.log(selectQuery);
	client.query(selectQuery, function (err, result) {
		if (err) throw err;
		console.log(result.rows);
		res.send(JSON.stringify(result.rows));
	});
}
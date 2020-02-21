exports.checkLogin = function (res, client, mail, pass) {
	let selectQuery = "select user_name from Users where user_mail = '" + mail + "' and user_pass = '" + pass + "';";
	console.log(selectQuery);
	client.query(selectQuery, function (err, result) {
		if (err) throw err;
		console.log(result.rows);
		if (result.rows.length == 1) {
			res.send("Welcome " + result.rows[0].user_name);
		}
		else {
			res.send("Login Failed");
		}
	});
}
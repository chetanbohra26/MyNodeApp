exports.insertTable = function (res, client, mail, name, pass) {
	let insertQuery = "insert into Users(user_mail,user_name,user_pass) values('" + mail + "','" + name + "','" + pass + "');";
	console.log("Processing query:");
	console.log(insertQuery);
	client.query(insertQuery, function (err, result) {
		if (err) {
			res.send('Error');
			throw err;
		}
		res.send('Record inserted');
	});
}
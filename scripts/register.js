exports.insertTable = function (res, client, mail, name, pass) {
	let insertQuery = "insert into Users(user_mail,user_name,user_pass) values($1, $2, $3);";
	console.log("Processing query:");
	console.log(insertQuery);
	client.query(insertQuery, [mail, name, pass], function (err, result) {
		try {
			if (err) {
				res.send('Error');
				throw err;
			}
			res.send('Record inserted');
		} catch (error) {
			console.log('Error : ' + error);
		}
	});
}
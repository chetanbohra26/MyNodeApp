exports.insertTable = function (res, client, mail, name, pass) {
	let insertQuery = "insert into Users(user_mail,user_name,user_pass) values('" + mail + "','" + name + "','" + pass + "');";
	console.log("Processing query:");
	console.log(insertQuery);
	client.query(insertQuery, function (err, result) {
		try {
			if (err) {
				res.send('Error');
				throw err;
			}			
		} catch (error) {
			console.log('Error : ' + error);
		}
		res.send('Record inserted');
	});
}
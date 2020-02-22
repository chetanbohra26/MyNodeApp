exports.selectTable = function (res, client, user) {
	let selectQuery = 'select * from Users';
	if(user){
		selectQuery += (' where user_id = ' + user);
	}
	selectQuery += ';';
	console.log(selectQuery);
	client.query(selectQuery, function (err, result) {
		try {
			if (err) {
				res.send('Error');
				throw err;
			}
			console.log(result.rows);
			res.send(JSON.stringify(result.rows));
		} catch (error) {
			console.log('Error : ' + error);
		}
	});
}
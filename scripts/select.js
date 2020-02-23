exports.selectTable = function (res, client, user) {
	let selectQuery = 'select * from Users where user_id = $1;';
	console.log('Query :%s [$1 : %s]', selectQuery, user);
	client.query(selectQuery, [user], function (err, result) {
		try {
			if (err) {
				res.send('Error');
				throw err;
			}
			console.log(result.rows);
			res.send(JSON.stringify(result.rows));
		} catch (error) {
			console.log('Error : %s', error);
		}
	});
}
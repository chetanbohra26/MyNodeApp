exports.checkLogin = function (res, client, mail, pass) {
	let selectQuery = 'select user_name from Users where user_mail = $1 and user_pass = $2 ;';
	console.log(selectQuery);
	client.query(selectQuery, [mail, pass], function (err, result) {
		try {
			if (err) {
				res.send('Connection error');
				throw err;
			}
			console.log(result.rows);
			if (result.rows.length == 1) {
				res.send('Welcome ' + result.rows[0].user_name);
			}
			else {
				res.send('Login Failed');
			}
		} catch (error) {
			console.log('Error : %s ', error);
		}
	});
}
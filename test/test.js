var crypto = require('crypto');
var argon2i = require('argon2-ffi').argon2i;

var config = {
	hashBytes: 32,
	saltBytes: 64,
	iterations: 10000,
	digest: 'SHA-512'
};

exports.getHash = async function (pass) {
	try{
		var salt = crypto.randomBytes(config.saltBytes);
		let hash = await argon2i.hash(pass, salt);
		return hash;
	}
	catch(err){
		throw err;
	}
};

exports.check = async function (hash, pass) {
	try {
		var passBuff = new Buffer.from(pass);
		let correct = await argon2i.verify(hash, passBuff);
		return correct;
	}
	catch (err) {
		console.log('Error : %s', err);
		return null;
	}
}

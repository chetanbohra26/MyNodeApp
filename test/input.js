var secure = require('./test');

var pass = 'power';
//console.log('Password : %s', pass);

var getHash = async function(pass){
	var hash = await secure.getHash(pass); 
	console.log('Hash : %s',hash);
}
getHash(pass);

var check = async function(hash,pass){
	var status = await secure.check(hash, pass);
	console.log(status);
}
var hash = '$argon2i$v=19$m=4096,t=3,p=1$ZRMfg0gmcdL6DBoFRFgE2w$LHbyoBvOSdsyvVN6blTxXfz/G916+yNJ3JrA1LK8ehQ';
//check(hash,'powerPass21');
	

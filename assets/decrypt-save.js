(function() {
var pwStorage;
var id;
var pw;
try {
	pwStorage = JSON.parse(sessionStorage.getItem('pw'));
	id = location.pathname;
	pw = pwStorage[id];
} catch(e) {}
if (!pw) return;

var wrapper = document.getElementById('protected');
var enc = wrapper.getAttribute('data-encrypted');
var iv = sjcl.codec.base64.toBits(enc.slice(0, 16));
var ct = sjcl.codec.base64.toBits(enc.slice(16));
var key = sjcl.codec.base64.toBits(pw);

try {
	var dec = sjcl.mode.gcm.decrypt(new sjcl.cipher.aes(key), ct, iv);
	var pt = sjcl.codec.utf8String.fromBits(dec);
	wrapper.innerHTML = pt;
	document.documentElement.classList.add('js-decrypt-save');
	document.addEventListener('DOMContentLoaded', function() {
		var form = document.getElementById('auth');
		form.parentNode.removeChild(form);
	});
} catch(e) {
	try {
		delete pwStorage[id];
		if (Object.keys(pwStorage).length) {
			sessionStorage.setItem('pw', JSON.stringify(pwStorage));
		} else {
			sessionStorage.removeItem('pw');
		}
	} catch(e) {}
}
})();

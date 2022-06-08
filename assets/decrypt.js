(function() {
document.documentElement.classList.add('js-decrypt');

/* SJCL | (c) Emily Stark, Mike Hamburg and Dan Boneh at Stanford University | BSD License https://github.com/bitwiseshiftleft/sjcl/blob/master/LICENSE.txt */
'use strict';window.sjcl={cipher:{},hash:{},mode:{},codec:{},bitArray:{bitSlice:function(t,r,e){return t=sjcl.bitArray._shiftRight(t.slice(r/32),32-(31&r)).slice(1),void 0===e?t:sjcl.bitArray.clamp(t,e-r)},concat:function(t,r){if(0===t.length||0===r.length)return t.concat(r);var e=t[t.length-1],i=sjcl.bitArray.getPartial(e);return 32===i?t.concat(r):sjcl.bitArray._shiftRight(r,i,0|e,t.slice(0,t.length-1))},bitLength:function(t){var r=t.length;return 0===r?0:(t=t[r-1],32*(r-1)+sjcl.bitArray.getPartial(t))},clamp:function(t,r){if(32*t.length<r)return t;var e=(t=t.slice(0,Math.ceil(r/32))).length;return r&=31,0<e&&r&&(t[e-1]=sjcl.bitArray.partial(r,t[e-1]&2147483648>>r-1,1)),t},partial:function(t,r,e){return 32===t?r:(e?0|r:r<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,r){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(r))return!1;for(var e=0,i=0;i<t.length;i++)e|=t[i]^r[i];return 0===e},_shiftRight:function(t,r,e,i){var c,s;for(void 0===i&&(i=[]);32<=r;r-=32)i.push(e),e=0;if(0===r)return i.concat(t);for(c=0;c<t.length;c++)i.push(e|t[c]>>>r),e=t[c]<<32-r;return s=t.length?t[t.length-1]:0,s=sjcl.bitArray.getPartial(s),i.push(sjcl.bitArray.partial(r+s&31,32<r+s?e:i.pop(),1)),i},_xor4:function(t,r){return[t[0]^r[0],t[1]^r[1],t[2]^r[2],t[3]^r[3]]}}};sjcl.codec.base64={_chars:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',fromBits:function(t,r){for(var e='',i=0,c=sjcl.codec.base64._chars,s=0,n=sjcl.bitArray.bitLength(t),h=0;6*e.length<n;)e+=c.charAt((s^t[h]>>>i)>>>26),i<6?(s=t[h]<<6-i,i+=26,h++):(s<<=6,i-=6);for(;3&e.length&&!r;)e+='=';return e},toBits:function(t){t=t.replace(/\s|=/g,'');for(var r,e=[],i=0,c=sjcl.codec.base64._chars,s=0,n=0;n<t.length;n++){if((r=c.indexOf(t.charAt(n)))<0)throw Error();26<i?(i-=26,e.push(s^r>>>i),s=r<<32-i):s^=r<<32-(i+=6)}return 56&i&&e.push(sjcl.bitArray.partial(56&i,s,1)),e}},sjcl.codec.utf8String={fromBits:function(t){for(var r,e='',i=sjcl.bitArray.bitLength(t),c=0;c<i/8;c++)0==(3&c)&&(r=t[c/4]),e+=String.fromCharCode(r>>>8>>>8>>>8),r<<=8;return decodeURIComponent(escape(e))},toBits:function(t){t=unescape(encodeURIComponent(t));for(var r=[],e=0,i=0;i<t.length;i++)e=e<<8|t.charCodeAt(i),3==(3&i)&&(r.push(e),e=0);return 3&i&&r.push(sjcl.bitArray.partial(8*(3&i),e)),r}},sjcl.hash.sha256=function(t){this._key[0]||this._precompute(),t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(t){'string'==typeof t&&(t=sjcl.codec.utf8String.toBits(t));var r=this._buffer=sjcl.bitArray.concat(this._buffer,t),e=this._length,i=this._length=e+sjcl.bitArray.bitLength(t);if(9007199254740991<i)throw Error();if('undefined'!=typeof Uint32Array){for(var c=new Uint32Array(r),s=0,n=512+e-(512+e&511);n<=i;n+=512)this._block(c.subarray(16*s,16*(s+1))),s+=1;r.splice(0,16*s)}else for(n=512+e-(512+e&511);n<=i;n+=512)this._block(r.splice(0,16));return this},finalize:function(){for(var t=this._buffer,r=this._h,e=(t=sjcl.bitArray.concat(t,[sjcl.bitArray.partial(1,1)])).length+2;15&e;e++)t.push(0);for(t.push(Math.floor(this._length/4294967296)),t.push(0|this._length);t.length;)this._block(t.splice(0,16));return this.reset(),r},_init:[],_key:[],_precompute:function(){var t,r,e=0,i=2;function c(t){return 4294967296*(t-Math.floor(t))|0}for(;e<64;i++){for(r=!0,t=2;t*t<=i;t++)if(i%t==0){r=!1;break}r&&(e<8&&(this._init[e]=c(Math.pow(i,.5))),this._key[e]=c(Math.pow(i,1/3)),e++)}},_block:function(t){for(var r,e,i=this._h,c=this._key,s=i[0],n=i[1],h=i[2],a=i[3],o=i[4],l=i[5],f=i[6],u=i[7],g=0;g<64;g++)r=(r=g<16?t[g]:(r=t[g+1&15],e=t[g+14&15],t[15&g]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+t[15&g]+t[g+9&15]|0))+u+(o>>>6^o>>>11^o>>>25^o<<26^o<<21^o<<7)+(f^o&(l^f))+c[g],u=f,f=l,l=o,o=a+r|0,a=h,h=n,s=r+((n=s)&h^a&(n^h))+(n>>>2^n>>>13^n>>>22^n<<30^n<<19^n<<10)|0;i[0]=i[0]+s|0,i[1]=i[1]+n|0,i[2]=i[2]+h|0,i[3]=i[3]+a|0,i[4]=i[4]+o|0,i[5]=i[5]+l|0,i[6]=i[6]+f|0,i[7]=i[7]+u|0}},sjcl.cipher.aes=function(t){this._tables[0][0][0]||this._precompute();var r,e,i,c,s,n=this._tables[0][4],h=this._tables[1],a=t.length,o=1;if(4!==a&&6!==a&&8!==a)throw Error();for(this._key=[c=t.slice(0),s=[]],r=a;r<4*a+28;r++)i=c[r-1],(r%a==0||8===a&&r%a==4)&&(i=n[i>>>24]<<24^n[i>>16&255]<<16^n[i>>8&255]<<8^n[255&i],r%a==0&&(i=i<<8^i>>>24^o<<24,o=o<<1^283*(o>>7))),c[r]=c[r-a]^i;for(e=0;r;e++,r--)i=c[3&e?r:r-4],s[e]=r<=4||e<4?i:h[0][n[i>>>24]]^h[1][n[i>>16&255]]^h[2][n[i>>8&255]]^h[3][n[255&i]]},sjcl.cipher.aes.prototype={encrypt:function(t){return this._crypt(t,0)},decrypt:function(t){return this._crypt(t,1)},_tables:[[[],[],[],[],[]],[[],[],[],[],[]]],_precompute:function(){for(var t,r,e,i,c,s,n,h=this._tables[0],a=this._tables[1],o=h[4],l=a[4],f=[],u=[],g=0;g<256;g++)u[(f[g]=g<<1^283*(g>>7))^g]=g;for(t=r=0;!o[t];t^=e||1,r=u[r]||1)for(n=16843009*f[i=f[e=f[l[o[t]=c=(c=r^r<<1^r<<2^r<<3^r<<4)>>8^255&c^99]=t]]]^65537*i^257*e^16843008*t,s=257*f[c]^16843008*c,g=0;g<4;g++)h[g][t]=s=s<<24^s>>>8,a[g][c]=n=n<<24^n>>>8;for(g=0;g<5;g++)h[g]=h[g].slice(0),a[g]=a[g].slice(0)},_crypt:function(t,r){if(4!==t.length)throw Error();for(var e,i,c,s=this._key[r],n=t[0]^s[0],h=t[r?3:1]^s[1],a=t[2]^s[2],o=t[r?1:3]^s[3],l=s.length/4-2,f=4,u=[0,0,0,0],t=this._tables[r],g=t[0],_=t[1],p=t[2],b=t[3],y=t[4],j=0;j<l;j++)e=g[n>>>24]^_[h>>16&255]^p[a>>8&255]^b[255&o]^s[f],i=g[h>>>24]^_[a>>16&255]^p[o>>8&255]^b[255&n]^s[f+1],c=g[a>>>24]^_[o>>16&255]^p[n>>8&255]^b[255&h]^s[f+2],o=g[o>>>24]^_[n>>16&255]^p[h>>8&255]^b[255&a]^s[f+3],f+=4,n=e,h=i,a=c;for(j=0;j<4;j++)u[r?3&-j:j]=y[n>>>24]<<24^y[h>>16&255]<<16^y[a>>8&255]<<8^y[255&o]^s[f++],e=n,n=h,h=a,a=o,o=e;return u}},sjcl.mode.gcm={decrypt:function(t,r,e,i,c){var s,r=r.slice(0),n=sjcl.bitArray,h=n.bitLength(r);if(i=i||[],r=(c=c||128)<=h?(s=n.bitSlice(r,h-c),n.bitSlice(r,0,h-c)):(s=r,[]),h=sjcl.mode.gcm._ctrMode(!1,t,r,i,e,c),n.equal(h.tag,s))return h.data;throw Error()},_galoisMultiply:function(t,r){for(var e,i,c=sjcl.bitArray._xor4,s=[0,0,0,0],n=r.slice(0),h=0;h<128;h++){for(0!=(t[Math.floor(h/32)]&1<<31-h%32)&&(s=c(s,n)),i=0!=(1&n[3]),e=3;0<e;e--)n[e]=n[e]>>>1|(1&n[e-1])<<31;n[0]=n[0]>>>1,i&&(n[0]=n[0]^225<<24)}return s},_ghash:function(t,r,e){for(var i=e.length,c=r.slice(0),s=0;s<i;s+=4)c[0]^=4294967295&e[s],c[1]^=4294967295&e[s+1],c[2]^=4294967295&e[s+2],c[3]^=4294967295&e[s+3],c=sjcl.mode.gcm._galoisMultiply(c,t);return c},_ctrMode:function(t,r,e,i,c,s){var n,h,a=sjcl.bitArray,o=e.length,l=a.bitLength(e),f=a.bitLength(i),u=a.bitLength(c),g=r.encrypt([0,0,0,0]),_=96===u?(_=c.slice(0),a.concat(_,[1])):(_=sjcl.mode.gcm._ghash(g,[0,0,0,0],c),sjcl.mode.gcm._ghash(g,_,[0,0,Math.floor(u/4294967296),4294967295&u])),c=sjcl.mode.gcm._ghash(g,[0,0,0,0],i),p=_.slice(0),u=c.slice(0);for(t||(u=sjcl.mode.gcm._ghash(g,c,e)),h=0;h<o;h+=4)p[3]++,n=r.encrypt(p),e[h]^=n[0],e[h+1]^=n[1],e[h+2]^=n[2],e[h+3]^=n[3];return e=a.clamp(e,l),t&&(u=sjcl.mode.gcm._ghash(g,c,e)),i=[Math.floor(f/4294967296),4294967295&f,Math.floor(l/4294967296),4294967295&l],u=sjcl.mode.gcm._ghash(g,u,i),n=r.encrypt(_),u[0]^=n[0],u[1]^=n[1],u[2]^=n[2],u[3]^=n[3],{tag:a.bitSlice(u,0,s),data:e}}};

document.addEventListener('DOMContentLoaded', function() {
	var wrapper = document.getElementById('protected');
	var form = document.getElementById('auth');
	var input = document.getElementById('password');
	var fallback = document.getElementById('protect-fallback');

	var enc = wrapper.getAttribute('data-encrypted');
	var iv = sjcl.codec.base64.toBits(enc.slice(0, 16));
	var ct = sjcl.codec.base64.toBits(enc.slice(16));

	fallback.parentNode.removeChild(fallback);

	var _form = document.createElement('form');
	var active = document.activeElement;
	var hasFocus = form.contains(active);
	_form.id = form.id;
	while (form.firstChild) _form.appendChild(form.firstChild);
	form.parentNode.replaceChild(_form, form);
	if (hasFocus) active.focus();
	form = _form;

	input.oninput = function() { input.setCustomValidity(''); }

	form.onsubmit = function(e) {
		e.preventDefault();
		var pw = input.value;
		if (!pw) return;
		var key = sjcl.hash.sha256.hash(pw);
		try {
			var dec = sjcl.mode.gcm.decrypt(new sjcl.cipher.aes(key), ct, iv);
			var pt = sjcl.codec.utf8String.fromBits(dec);
			wrapper.innerHTML = pt;
		} catch(e) {
			input.setCustomValidity('암호가 일치하지 않습니다.');
			input.reportValidity();
			return;
		}
		try {
			var pwStorage = JSON.parse(sessionStorage.getItem('pw'));
			if (!pwStorage) pwStorage = {};
			pwStorage[location.pathname] = sjcl.codec.base64.fromBits(key);
			sessionStorage.setItem('pw', JSON.stringify(pwStorage));
		} catch(e) {}
	};
});
})();

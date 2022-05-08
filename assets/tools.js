(function() {
var head = document.head;
var root = document.documentElement;
var rootStyle = window.getComputedStyle(root);
var rootClassList = root.classList;

rootClassList.add('js-tools');

/* top button */
document.addEventListener('DOMContentLoaded', function() {
	var fcs = document.createElement('button');
	var btn = document.querySelector('button.totop');
	var anc = document.querySelector('a.totop');
	fcs.style.cssText = 'border:0;outline:none;position:absolute';
	btn.onclick = function() {
		document.body.insertBefore(fcs, document.body.firstChild);
		fcs.focus({ preventScroll: true });
		document.body.removeChild(fcs);
		window.scroll(0, 0);
	};
	btn.hidden = false;
	anc.parentNode.removeChild(anc);
});

/* setting dashboard */

function getSetting(key) {
	var data;
	try {
		data = JSON.parse(localStorage.getItem(key));
	} catch(e) {
		data = null;
	}
	return data;
}

function setSetting(key, data) {
	if (data) try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch(e) {}
	else try {
		localStorage.removeItem(key);
	} catch(e) {}
}

function getTheme() {
	var theme = getSetting('theme');
	return Array.isArray(theme) ? theme : null;
}

function getStyle() {
	var style = getSetting('style');
	return (typeof style === 'object') ? style : null;
}

function overrideThemeColor(index) {
	customThemeColor.content = THEME_COLOR[index];
	if (head.contains(themeColors[0])) {
		head.insertBefore(customThemeColor, themeColors[0]);
		head.removeChild(themeColors[0]);
		head.removeChild(themeColors[1]);
	} else {
		head.appendChild(customThemeColor);
	}
}

function initThemeColor() {
	if (head.contains(customThemeColor)) {
		head.insertBefore(themeColors[0], customThemeColor);
		head.insertBefore(themeColors[1], customThemeColor);
		head.removeChild(customThemeColor);
	} else {
		head.appendChild(themeColors[0]);
		head.appendChild(themeColors[1]);
	}
}

var UA = navigator.userAgent.toLowerCase();
if (UA.indexOf('firefox') > -1 && UA.indexOf('android') > -1) {
	var initFontSize = '';
	var initLineHeight = '';
} else {
	initFontSize = parseFloat(rootStyle.fontSize);
	initLineHeight = (parseFloat(rootStyle.lineHeight) / initFontSize * 100) || '';
}

var userTheme = getTheme();
var userStyle = getStyle();

var themeColors = document.querySelectorAll('[name=theme-color]');
var THEME_COLOR = [themeColors[0].content, themeColors[1].content];
var customThemeColor = document.createElement('meta');
customThemeColor.name = 'theme-color';

if (userTheme) userTheme.forEach(function(v) { rootClassList.add(v) });
if (userStyle) for (var prop in userStyle) {
	root.style.setProperty(prop, userStyle[prop]);
}

if (rootClassList.contains('light')) overrideThemeColor(0);
else if (rootClassList.contains('dark')) overrideThemeColor(1);

document.addEventListener('DOMContentLoaded', function() {
	var btn = document.getElementById('setting-toggle');
	var icon = btn.getElementsByTagName('path')[0];
	var gear = icon.getAttribute('d');
	var board = document.createElement('div');

	board.innerHTML = '<p><label id="wrapper-light"><input id="light" type="checkbox">밝게</label> <label id="wrapper-dark"><input id="dark" type="checkbox">어둡게</label> <label><input id="wide" type="checkbox">넓게</label></p><p><label>글꼴: <select id="font-family"><option></option><option value="sans-serif">sans-serif</option><option value="serif">serif</option><optgroup label="웹폰트"><option value="KoddiUD OnGothic" data-generic="sans-serif">KoddiUD 온고딕</option><option value="Pretendard" data-generic="sans-serif">Pretendard</option><option value="RIDIBatang" data-generic="serif">리디바탕</option><option value="MaruBuri" data-generic="serif">마루부리</option></optgroup></select></label></p><p><label>글자: <span><input id="font-size" type="number"> px</span></label></p><p><label>행간: <span><input id="line-height" type="number"> %</span></label></p>';

	function changeTheme(e) {
		var name = e.target.id;
		var isChecked = e.target.checked;
		var isColorScheme = (name == 'light' || name == 'dark');

		if (isChecked) {
			rootClassList.add(name);
			if (isColorScheme) {
				var reversedColorScheme = (name == 'light') ? 'dark' : 'light';
				document.getElementById(reversedColorScheme).checked = false;
				rootClassList.remove(reversedColorScheme);
				overrideThemeColor((name == 'light') ? 0 : 1);
			}
		} else {
			rootClassList.remove(name);
			if (name == 'wide')
				toggleWide();
			else if (isColorScheme)
				initThemeColor();
		}

		var arr = getTheme();
		if (isChecked) {
			if (arr) {
				if (isColorScheme) {
					var index = arr.indexOf(reversedColorScheme);
					if (index > -1) arr.splice(index, 1);
				}
				if (arr.indexOf(name) == -1) arr.push(name);
			} else {
				arr = [name];
			}
		} else if (arr) {
			var index = arr.indexOf(name);
			if (index > -1) arr.splice(index, 1);
			if (!arr.length) arr = null;
		}
		setSetting('theme', arr);
	}

	var themeSelectors = board.querySelectorAll('[type=checkbox]');
	for (var i=0, l; l=themeSelectors[i]; i++) {
		l.onclick = changeTheme;
		if (userTheme && userTheme.indexOf(l.id) > -1)
			l.checked = true;
	}

	var wide = board.querySelector('#wide');
	var wrapperWide = wide.parentNode;
	var containerStyle = window.getComputedStyle(document.getElementsByClassName('container')[0]);
	function toggleWide() {
		if (wide.checked) return;
		var containerWidth = (parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.width) + parseFloat(containerStyle.paddingRight)).toFixed();
		var rootWidth = parseFloat(rootStyle.width).toFixed();
		wrapperWide.hidden = (containerWidth == rootWidth);
	}
	toggleWide();
	window.onresize = toggleWide;

	function changeStyle(prop, val) {
		root.style.setProperty(prop, val);
		var obj = getStyle();
		if (val) {
			if (!obj) obj = {};
			obj[prop] = val;
		} else if (obj) {
			delete obj[prop];
			if (!Object.keys(obj).length) obj = null;
		}
		setSetting('style', obj);
	}

	var fontSelector = board.querySelector('#font-family');
	if (userStyle && userStyle['font-family']) {
		var selected = fontSelector.querySelector('[value='+userStyle['font-family'].split(',')[0]+']');
		if (selected) selected.selected = true;
	}
	fontSelector.onchange = function() {
		var val = fontSelector.value;
		var generic = fontSelector.options[fontSelector.selectedIndex].dataset.generic;
		if (generic) val = "'"+val+"','"+val+" Web',"+generic;
		changeStyle('font-family', val);
	};

	var fontSizer = board.querySelector('#font-size');
	fontSizer.placeholder = initFontSize;
	if (userStyle && userStyle['font-size'])
		fontSizer.value = parseFloat(userStyle['font-size']);
	fontSizer.onchange = function() {
		var val = fontSizer.value;
		if (val) {
			if (val < 8) val = 8;
			else if (val > 64) val = 64;
			fontSizer.value = val;
			val = val + 'px';
		}
		changeStyle('font-size', val);
		toggleWide();
	};

	var lineSizer = board.querySelector('#line-height');
	lineSizer.placeholder = initLineHeight;
	if (userStyle && userStyle['line-height'])
		lineSizer.value = parseFloat(userStyle['line-height']) * 100;
	lineSizer.onchange = function() {
		var val = lineSizer.value;
		if (val) {
			if (val < 100) val = 100;
			else if (val > 200) val = 200;
			lineSizer.value = val;
			val /= 100;
		}
		changeStyle('line-height', val);
	};

	board.id = 'setting';
	board.hidden = true;
	document.getElementById('header').appendChild(board);
	btn.onclick = function() {
		if (board.hidden) {
			board.hidden = false;
			icon.setAttribute('d', 'M3 3 13 13M13 3 3 13');
			btn.setAttribute('aria-expanded', 'true');
		} else {
			board.hidden = true;
			icon.setAttribute('d', gear);
			btn.setAttribute('aria-expanded', 'false');
		}
	};
	btn.setAttribute('aria-expanded', 'false');
	btn.setAttribute('aria-controls', 'setting');
	btn.hidden = false;
});

window.addEventListener('pageshow', function(e) {
	if (!e.persisted) return;

	userTheme = getTheme();
	userStyle = getStyle();

	['light','dark','wide'].forEach(function(v) {
		rootClassList.remove(v);
	});
	if (userTheme) userTheme.forEach(function(v) { rootClassList.add(v) });

	root.style.cssText = '';
	if (userStyle) for (var prop in userStyle) {
		root.style.setProperty(prop, userStyle[prop]);
	}

	initThemeColor();
	if (rootClassList.contains('light')) overrideThemeColor(0);
	else if (rootClassList.contains('dark')) overrideThemeColor(1);

	var themeSelectors = document.querySelectorAll('#setting [type=checkbox]');
	for (var i=0, l; l=themeSelectors[i]; i++) {
		l.checked = (userTheme && userTheme.indexOf(l.id) > -1);
	}

	var fontSelector = document.getElementById('font-family');
	var fontSizer = document.getElementById('font-size');
	var lineSizer = document.getElementById('line-height');

	fontSelector[0].selected = true;
	fontSizer.value = '';
	lineSizer.value = '';

	if (!userStyle) return;

	if (userStyle['font-family']) {
		var selected = fontSelector.querySelector('[value='+userStyle['font-family'].split(',')[0]+']');
		if (selected) selected.selected = true;
	}

	if (userStyle['font-size'])
		fontSizer.value = parseFloat(userStyle['font-size']);

	if (userStyle['line-height'])
		lineSizer.value = parseFloat(userStyle['line-height']) * 100;
});
})();

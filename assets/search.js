document.documentElement.classList.add('js-search');
document.addEventListener('DOMContentLoaded', function() {
	var box = document.getElementById('search-box');
	var result = document.getElementById('search-result');
	var field = document.getElementById('search-field');
	var summary = document.getElementById('search-summary');
	var fallback = document.getElementById('search-fallback');

	if (!window._SEARCH_INDEX) {
		document.documentElement.classList.remove('js-search');
		box.parentNode.removeChild(box);
		result.parentNode.removeChild(result);
		return;
	}

	var form = document.createElement('form');
	var active = document.activeElement;
	var hasFocus = box.contains(active);
	form.id = box.id;
	while (box.firstChild) form.appendChild(box.firstChild);
	box.parentNode.replaceChild(form, box);
	if (hasFocus) active.focus();
	box = form;

	fallback.parentNode.removeChild(fallback);

	box.onsubmit = function(e) {
		e.preventDefault();

		var input = field.value.trim();
		if (!input) return;
		var queries = input.split(/"(.+)"|(\S+)/).filter(function(e) {
			return (e && e.trim());
		});
		if (!queries.length) return;

		var matchedIndex = _SEARCH_INDEX.filter(function(e) {
			var title = e.title.toLowerCase();
			var content = e.content.toLowerCase();
			return queries.every(function(q) {
				q = q.toLowerCase();
				return (title.indexOf(q) > -1 || content.indexOf(q) > -1);
			});
		});

		var matchedTitle = matchedIndex.filter(function(e) {
			var title = e.title.toLowerCase();
			return queries.some(function(q) {
				return (title.indexOf(q.toLowerCase()) > -1);
			});
		});

		matchedIndex = matchedTitle.concat(matchedIndex.filter(function(e) {
			return (matchedTitle.indexOf(e) == -1);
		}));

		if (matchedIndex.length) {
			function escapeReg(a) {
				return '('+a.map(function(e) {
					return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				}).join('|')+')';
			}
			function escapeHTML(s) {
				return s.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;");
			}

			var pattern = escapeReg(queries);
			var patternHTML = escapeReg(queries.map(escapeHTML));
			var some = new RegExp(pattern, 'i');
			var all = new RegExp(pattern, 'gi');
			var allHTML = new RegExp(patternHTML, 'gi');
			var mark = '<b>$1</b>';

			var resultHTML = '<ul>';
			matchedIndex.forEach(function(e) {
				var title = e.title.replace(all, mark);

				var content = e.content;
				var exec = some.exec(content);
				if (!exec) {
					content = e.description;
				} else {
					var MAX = 20;
					var before = content.slice(0, exec.index).split(' ');
					var after = content.slice(exec.index + exec[0].length).split(' ');
					if (before.length < MAX) {
						content = content.split(' ').slice(0, MAX).join(' ')+' ...';
					} else if (after.length < MAX) {
						content = '... '+content.split(' ').slice(MAX*-1).join(' ');
					} else {
						content = '... '
							+ before.slice(MAX/-2).join(' ')
							+ exec[0]
							+ after.slice(0, MAX/2+1).join(' ')
							+ ' ...';
					}
					content = escapeHTML(content).replace(allHTML, mark);
				}

				var date = e.date;
				date = date.slice(0,4)+'년 '
					+ date.slice(5,7).replace(/^0/, '')+'월 '
					+ date.slice(8,10).replace(/^0/, '')+'일 발행';

				resultHTML += '<li>'
					+ '<p><a href="'+e.url+'">'+title+'</a></p>'
					+ '<p>'+content+'</p>'
					+ '<p>'+date+'</p>'
					+ '</li>';
			});
			resultHTML += '</ul>';

			result.innerHTML = resultHTML;
		} else {
			result.textContent = '';
		}
		summary.textContent = '검색 결과 '+matchedIndex.length+'건 — "'+queries.join('", "')+'"';
	};
});

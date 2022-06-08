---
layout: none
---
window._SEARCH_INDEX = [
	{%- for post in site.posts %}
	{
		url: "{{ post.url }}",
		title: "{{ post.title | replace: "\", "\\\" }}",
		date: "{{ post.date | date: "%F" }}",
		description: "{{ post.description | replace: "\", "\\\" }}",
		{%- if page.password %}
		content: "..."
		{%- else %}
		content: "{{ post.content | strip_html | normalize_whitespace | replace: '&lt;', '<' | replace: '&gt;', '>' | replace: '&amp;', '&' | replace: "\", "\\\" | replace: '"', '\\"' }}"
		{%- endif %}
	}{% unless forloop.last %},{% endunless %}
	{%- endfor %}
];

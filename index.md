---
---
## 사이트 소개

{{ site.about }}


## 최신 글

{% assign newest_date = site.posts.first.date %}
{% assign newest_posts = site.posts | where_exp: 'post', 'post.date == newest_date' | reverse %}

{{ newest_date | date: '%Y년 %-m월 %-d일' }} 갱신

{% include postlist.md posts=newest_posts date=false %}


## 글 목록

카테고리별 정렬.

[발행순 목록](/archives/) <span aria-hidden="true">|</span> [검색](/search/)

{% for category in site.categories %}

{% assign category_id = category[0] %}
{% assign category_name = site.data.categories[category_id] | default: category_id %}
{% assign category_posts = category[1] %}

### {{ category_name }}

{% include postlist.md posts=category_posts %}

{% endfor %}

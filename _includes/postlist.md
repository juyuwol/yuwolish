{% for post in include.posts %}
- [{{ post.title }}]({{ post.url }})
    
    {::nomarkdown}{{ post.description }}{:/}{% unless include.date == false %}
    
    {{ post.date | date: '%Y년 %-m월 %-d일' }} 발행{% endunless %}
{% endfor %}
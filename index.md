---
layout: home
---

# {{ site.title }}

{{ site.description }}

{% for post in site.posts %}

- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
  {% endfor %}

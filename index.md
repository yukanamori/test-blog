---
layout: home
---

<h1 style="text-align:center; font-size:2.5em; margin-top:2em;">Welcome to My Blog!</h1>
<p style="text-align:center; font-size:1.2em; color:#666;">Jekyll + GitHub Pages で作るシンプルなブログ</p>

<div style="max-width:700px; margin:2em auto;">
  <ul style="list-style:none; padding:0;">
    {% for post in site.posts %}
      <li style="margin-bottom:2em; border-bottom:1px solid #eee; padding-bottom:1em;">
        <h2><a href="{{ post.url }}" style="color:#007acc; text-decoration:none;">{{ post.title }}</a></h2>
        <p style="color:#888; font-size:0.9em;">{{ post.date | date: '%Y-%m-%d' }}</p>
        <p>{{ post.excerpt }}</p>
      </li>
    {% endfor %}
  </ul>
</div>

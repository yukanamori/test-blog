(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const posts = Array.isArray(window.postData) ? window.postData : [];
  const post = slug ? posts.find((p) => p.slug === slug) : posts[0];

  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const tagsEl = document.getElementById('post-tags');
  const contentEl = document.getElementById('post-content');
  const statusEl = document.getElementById('status');

  if (!post) {
    titleEl.textContent = 'No posts yet';
    statusEl.textContent = 'Add markdown files under posts/ and list them in data/posts.js.';
    return;
  }

  titleEl.textContent = post.title;
  metaEl.textContent = formatDate(post.date);
  tagsEl.innerHTML = (post.tags || [])
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join('');

  const markdownPath = post.markdown || post.url;
  if (!markdownPath) {
    statusEl.textContent = 'No markdown file is linked to this post.';
    return;
  }

  fetch(markdownPath)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load markdown');
      return res.text();
    })
    .then((md) => {
      contentEl.innerHTML = markdownToHtml(md);
      statusEl.hidden = true;
    })
    .catch((err) => {
      statusEl.textContent = 'Error loading this post.';
      console.error(err);
    });

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function escapeHtml(str = '') {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function markdownToHtml(md = '') {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inList = false;
    let inCode = false;
    let codeLang = '';
    const codeLines = [];

    lines.forEach((line) => {
      if (line.startsWith('```')) {
        if (inCode) {
          html += `<pre><code${codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ''}>${escapeHtml(codeLines.join('\n'))}</code></pre>`;
          codeLines.length = 0;
          codeLang = '';
          inCode = false;
        } else {
          inCode = true;
          codeLang = line.slice(3).trim();
        }
        return;
      }

      if (inCode) {
        codeLines.push(line);
        return;
      }

      if (!line.trim()) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        return;
      }

      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        const level = headingMatch[1].length;
        html += `<h${level}>${formatInline(headingMatch[2])}</h${level}>`;
        return;
      }

      const listMatch = line.match(/^[-*]\s+(.*)$/);
      if (listMatch) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${formatInline(listMatch[1])}</li>`;
        return;
      }

      if (inList) {
        html += '</ul>';
        inList = false;
      }

      html += `<p>${formatInline(line)}</p>`;
    });

    if (inList) html += '</ul>';
    if (inCode) {
      html += `<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`;
    }

    return html;
  }

  function formatInline(text = '') {
    let escaped = escapeHtml(text);
    escaped = escaped.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return escaped;
  }
})();

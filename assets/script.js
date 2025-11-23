(function () {
  const posts = Array.isArray(window.postData) ? window.postData : [];
  const listEl = document.getElementById('post-list');
  const filterBar = document.querySelector('.filters');
  const emptyState = document.getElementById('empty-state');

  function createTagButtons() {
    const tags = new Set();
    posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));

    tags.forEach((tag) => {
      const button = document.createElement('button');
      button.className = 'filter-button';
      button.dataset.tag = tag;
      button.textContent = tag;
      filterBar.appendChild(button);
    });

    filterBar.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      const tag = event.target.dataset.tag;
      if (!tag) return;

      filterBar.querySelectorAll('.filter-button').forEach((btn) => btn.classList.remove('active'));
      event.target.classList.add('active');
      renderPosts(tag);
    });
  }

  function renderPosts(tag = 'all') {
    listEl.innerHTML = '';
    const filtered = tag === 'all' ? posts : posts.filter((post) => post.tags?.includes(tag));

    if (!filtered.length) {
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;

    filtered.forEach((post) => {
      const href = post.url || `post.html?slug=${encodeURIComponent(post.slug)}`;
      const card = document.createElement('a');
      card.className = 'post-card';
      card.href = href;
      card.innerHTML = `
        <div class="post-meta">
          <span class="time">${formatDate(post.date)}</span>
          <div class="tags">${renderTags(post.tags)}</div>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      `;
      listEl.appendChild(card);
    });
  }

  function renderTags(tags = []) {
    return (tags || []).map((tag) => `<span class="tag">${tag}</span>`).join('');
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  createTagButtons();
  renderPosts();
})();

# GitHub Pages Tech Blog Starter

A minimal, static blog layout ready for GitHub Pages. Everything is HTML/CSS/JS so no build step is required.

## Structure
- `index.html` – homepage with post list
- `post.html` – markdown reader for individual posts
- `data/posts.js` – array of posts (title, date, tags, excerpt, slug, markdown path)
- `posts/` – markdown files for each post
- `assets/styles.css` – theme, colors, spacing
- `assets/script.js` – renders the post list and tag filters
- `assets/post.js` – loads markdown and renders it as HTML on `post.html`

## Publish on GitHub Pages
1. Create a repository on GitHub (public works best for Pages).
2. Copy these files into the repo, then commit and push to `main`:
   ```bash
   git add .
   git commit -m "Initialize blog"
   git branch -M main
   git remote add origin https://github.com/<your-account>/<your-repo>.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**. Under **Source**, choose **Deploy from a branch**, pick the **main** branch and **/** (root) folder, then save. Your site URL will appear after the first deploy.

## Add a new post (Markdown)
1. Create a markdown file in `posts/`, e.g. `posts/my-new-post.md`.
2. Add an entry to `data/posts.js`:
   ```js
   {
     title: 'My New Post',
     date: '2024-12-01',
     slug: 'my-new-post',
     tags: ['tag1', 'tag2'],
     excerpt: 'Short summary for the homepage.',
     markdown: 'posts/my-new-post.md'
   }
   ```
3. Commit and push. Pages will redeploy automatically.

## Customize the look
- Adjust colors, spacing, and gradients in `assets/styles.css`.
- Fonts are loaded from Google Fonts in the `<head>` of each page; swap them if you prefer different typography.
- Change the hero copy or navigation links directly in `index.html`.

That is all you need to keep a lean, GitHub Pages–friendly tech blog.

# Ship on GitHub Pages

Pages can host static files from your repository without a build step. This starter lives entirely in HTML/CSS/JS, so you can publish as soon as you push.

## 1) Create a repository
- On GitHub, create a new public repo (for example, `tech-blog`).
- Clone it locally and copy this project into the repository directory.
- Commit the files: `git add . && git commit -m "Initialize blog"`.

## 2) Push to main
```
git branch -M main
git remote add origin https://github.com/<your-account>/<your-repo>.git
git push -u origin main
```

## 3) Enable GitHub Pages
- In the repository on GitHub, open **Settings → Pages**.
- Under **Source**, choose **Deploy from a branch**.
- Pick the **main** branch and the **/** (root) folder, then save.
- GitHub will give you a site URL after it builds (usually in under a minute).

## 4) Add posts and iterate
- Create new markdown files in `posts/`.
- List them in `data/posts.js` with title, date, tags, excerpt, slug, and markdown path.
- Push changes; Pages will redeploy automatically.

That is all you need for a lean, fast GitHub Pages site. If you later want a custom domain, add your DNS records and configure it under Pages.

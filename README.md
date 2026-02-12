# Anant's Blog & Portfolio

This site supports a markdown-driven blog homepage and a curated portfolio tab that auto-loads repositories from GitHub.

## Add new blog posts

1. Create a new file in `src/content`, for example `src/content/my-new-post.md`.
2. Add optional frontmatter:

```md
---
title: My New Post
date: 2026-02-12
---

# Markdown content goes here
```

If `title` is omitted, the first markdown heading is used as the title.

## Curate your portfolio and LinkedIn profile

Update `src/config.ts`:

- `name`, `linkedin.url`, `linkedin.headline`, `linkedin.summary`, `location`, `tagline` for your intro.
- `experience` and `education` arrays to keep key profile history up to date.
- `publications` to highlight papers/articles with links.
- `githubUsername` and `featuredRepoNames` for automatic GitHub project curation.
- `interests` tags for quick skill/context chips.

The portfolio page includes manual curation blocks (publication, experience, education) plus automatic GitHub sections (**Featured**, **Top starred**, **Recently updated**).

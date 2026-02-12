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

- `githubUsername`: GitHub user for project auto-discovery.
- `linkedin.url`: Your public LinkedIn profile URL.
- `linkedin.headline`, `linkedin.summary`, `location`, `tagline`: Profile intro shown on the portfolio page.
- `interests`: Topic tags shown under your intro.
- `featuredRepoNames`: Repository names to pin into the Featured section.

The portfolio page automatically sections projects into **Featured**, **Top starred**, and **Recently updated**.

import React, { useEffect, useMemo, useState } from 'react';
import { PROFILE } from '../config';

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  homepage: string | null;
  fork: boolean;
  updated_at: string;
  topics?: string[];
}

const getPrimaryLanguageMix = (repos: GithubRepo[]) => {
  const counts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) {
      return acc;
    }

    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
};

const Portfolio: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${PROFILE.githubUsername}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
          throw new Error(`GitHub API request failed with ${response.status}`);
        }

        const data: GithubRepo[] = await response.json();
        setRepos(data.filter((repo) => !repo.fork));
      } catch {
        setError('Could not load GitHub repositories right now.');
      }
    };

    fetchRepos();
  }, []);

  const curatedRepos = useMemo(() => {
    const featuredByName = repos.filter((repo) => PROFILE.featuredRepoNames.includes(repo.name));

    const topStarred = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .filter((repo) => !PROFILE.featuredRepoNames.includes(repo.name))
      .slice(0, 6);

    const recent = [...repos]
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .filter((repo) => !PROFILE.featuredRepoNames.includes(repo.name))
      .slice(0, 6);

    return {
      featured: featuredByName,
      topStarred,
      recent,
    };
  }, [repos]);

  const languageMix = useMemo(() => getPrimaryLanguageMix(repos), [repos]);

  return (
    <section className="space-y-6 text-left">
      <header className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-2xl font-bold">{PROFILE.name}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-200">{PROFILE.linkedin.headline}</p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{PROFILE.linkedin.summary}</p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {PROFILE.location} • {PROFILE.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a
            href={`https://github.com/${PROFILE.githubUsername}`}
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Profile
          </a>
          <a
            href={PROFILE.linkedin.url}
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {PROFILE.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            >
              {interest}
            </span>
          ))}
        </div>
      </header>

      {languageMix.length ? (
        <section>
          <h3 className="mb-3 text-xl font-semibold">Primary tech stack</h3>
          <div className="flex flex-wrap gap-2">
            {languageMix.map(([language, count]) => (
              <span
                key={language}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm dark:border-gray-600"
              >
                {language} ({count})
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <div>
        <h3 className="mb-3 text-xl font-semibold">Curated projects from GitHub</h3>
        {error ? <p className="text-red-600 dark:text-red-400">{error}</p> : null}

        {!error && repos.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Loading repositories...</p>
        ) : null}

        {curatedRepos.featured.length ? (
          <section className="mb-6">
            <h4 className="mb-3 text-lg font-semibold">Featured</h4>
            <div className="grid gap-4 md:grid-cols-2">
              {curatedRepos.featured.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mb-6">
          <h4 className="mb-3 text-lg font-semibold">Top starred</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {curatedRepos.topStarred.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>

        <section>
          <h4 className="mb-3 text-lg font-semibold">Recently updated</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {curatedRepos.recent.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ repo: GithubRepo }> = ({ repo }) => (
  <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <a
      href={repo.html_url}
      className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
      target="_blank"
      rel="noreferrer"
    >
      {repo.name}
    </a>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
      {repo.description || 'No description provided.'}
    </p>
    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
      {repo.language || 'Unknown language'} • ⭐ {repo.stargazers_count}
    </p>
    {repo.homepage ? (
      <a
        href={repo.homepage}
        className="mt-3 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        target="_blank"
        rel="noreferrer"
      >
        Live demo
      </a>
    ) : null}
  </article>
);

export default Portfolio;

import { useState } from 'react';
import Blog from './components/Blog';
import Portfolio from './components/Portfolio';

type Tab = 'blog' | 'portfolio';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('blog');

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h1 className="text-3xl font-bold">Anant&apos;s Blog</h1>
          <nav className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('blog')}
              className={`rounded px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'blog'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('portfolio')}
              className={`rounded px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Portfolio
            </button>
          </nav>
        </header>

        <main>{activeTab === 'blog' ? <Blog /> : <Portfolio />}</main>
      </div>
    </div>
  );
}

export default App;

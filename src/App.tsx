import Blog from './components/Blog';

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-2xl p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Anant's Repository of Things</h1>
          <Blog />
      </div>
    </div>
  );
};


export default App

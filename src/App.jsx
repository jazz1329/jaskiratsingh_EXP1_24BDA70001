import React from 'react';
import PostComposer from './components/PostComposer';
import './App.css';

/**
 * App Component
 * serves as the layout layout scaffold. Displays title banner, mounts composition dashboard,
 * and sets up footer credentials for practical/viva presentation.
 */
function App() {
  return (
    <div className="app-container">
      {/* 1. Header Hero Panel */}
      <header className="app-header">
        <h1>Multi-Platform Post Composer</h1>
        <p>Compose, validate, and preview your posts across popular platforms in real-time.</p>
      </header>

      {/* 2. Main Post Composer Dashboard */}
      <main>
        <PostComposer />
      </main>

      {/* 3. Footer with Student Viva Details */}
      <footer className="app-footer">
        <p>
          React Practical Examination Project. Developed using <code>React Functional Components</code> and <code>useState</code> hooks.
        </p>
      </footer>
    </div>
  );
}

export default App;

import { useState } from 'react';
import Home from './components/Home';
import Lesson from './components/Lesson';
import { lessons } from './data/lessons';
import './index.css';

export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState({});

  function handleComplete() {
    setProgress(p => ({ ...p, [activeLesson.id]: 'complete' }));
    setActiveLesson(null);
  }

  return (
    <div className="app">
      {activeLesson ? (
        <Lesson
          lesson={activeLesson}
          onComplete={handleComplete}
          onBack={() => setActiveLesson(null)}
        />
      ) : (
        <Home lessons={lessons} progress={progress} onStart={setActiveLesson} />
      )}
    </div>
  );
}

export default function Home({ lessons, progress, onStart }) {
  return (
    <div className="home">
      <div className="home-header">
        <div className="app-logo">🇰🇭</div>
        <h1>Learn Khmer</h1>
        <p className="khmer-subtitle">រៀនភាសាខ្មែរ</p>
      </div>

      <div className="lessons-list">
        {lessons.map((lesson, i) => {
          const done = progress[lesson.id] === 'complete';
          const locked = i > 0 && !progress[lessons[i - 1].id];
          return (
            <button
              key={lesson.id}
              className={`lesson-tile ${done ? 'done' : ''} ${locked ? 'locked' : ''}`}
              style={{ '--accent': lesson.color }}
              onClick={() => !locked && onStart(lesson)}
              disabled={locked}
            >
              <span className="lesson-icon">{lesson.icon}</span>
              <div className="lesson-info">
                <strong>{lesson.title}</strong>
                <span>{lesson.subtitle}</span>
              </div>
              <span className="lesson-status">
                {locked ? '🔒' : done ? '✅' : '▶'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

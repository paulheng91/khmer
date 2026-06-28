import { playKhmer } from '../useAudio';

export default function FlashCard({ card, onNext, current, total }) {
  return (
    <div className="flashcard-screen">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(current / total) * 100}%` }} />
      </div>
      <p className="step-label">Learn · {current} of {total}</p>

      <div className="card">
        <div className="khmer-text">{card.khmer}</div>
        <div className="romanization">{card.romanization}</div>
        <div className="english-text">{card.english}</div>
        <button className="audio-btn" onClick={() => playKhmer(card.key)}>
          🔊 Listen
        </button>
      </div>

      <button className="continue-btn" onClick={onNext}>
        Continue →
      </button>
    </div>
  );
}

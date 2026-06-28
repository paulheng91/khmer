import { useState, useEffect } from 'react';
import { playKhmer } from '../useAudio';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildChoices(card, allCards, key) {
  const correct = card[key];
  const distractors = shuffle(allCards.filter(c => c[key] !== correct))
    .slice(0, 3)
    .map(c => c[key]);
  return shuffle([correct, ...distractors]);
}

export default function QuizCard({ card, allCards, onNext, current, total, type }) {
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);

  const isKhmerToEng = type === 'khmer-to-english';
  const answerKey = isKhmerToEng ? 'english' : 'khmer';
  const correct = card[answerKey];

  useEffect(() => {
    setChoices(buildChoices(card, allCards, answerKey));
    setSelected(null);
  }, [card, type]);

  function handleSelect(choice) {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === correct) playKhmer(card.key);
  }

  function choiceClass(c) {
    if (selected === null) return 'choice';
    if (c === correct) return 'choice correct';
    if (c === selected) return 'choice wrong';
    return 'choice dimmed';
  }

  return (
    <div className="flashcard-screen">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(current / total) * 100}%` }} />
      </div>
      <p className="step-label">Quiz · {current} of {total}</p>

      <div className="quiz-prompt">
        {isKhmerToEng ? (
          <>
            <p className="quiz-question">What does this mean?</p>
            <div className="quiz-khmer">
              {card.khmer}
              <button className="audio-btn-small" onClick={() => playKhmer(card.key)}>🔊</button>
            </div>
            <div className="quiz-roman">{card.romanization}</div>
          </>
        ) : (
          <>
            <p className="quiz-question">How do you write this in Khmer?</p>
            <div className="quiz-english-prompt">{card.english}</div>
          </>
        )}
      </div>

      <div className="choices">
        {choices.map(c => (
          <button key={c} className={choiceClass(c)} onClick={() => handleSelect(c)}>
            {c}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`feedback ${selected === correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          <span>{selected === correct ? '✓ Correct!' : `✗ Correct: ${correct}`}</span>
          <button className="continue-btn-sm" onClick={onNext}>Next →</button>
        </div>
      )}
    </div>
  );
}

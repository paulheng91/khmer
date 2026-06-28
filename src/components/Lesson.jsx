import { useState, useMemo } from 'react';
import FlashCard from './FlashCard';
import QuizCard from './QuizCard';

function buildQuizRound(cards) {
  const qs = [];
  cards.forEach(card => {
    qs.push({ card, type: 'khmer-to-english' });
    qs.push({ card, type: 'english-to-khmer' });
  });
  return qs.sort(() => Math.random() - 0.5);
}

export default function Lesson({ lesson, onComplete, onBack }) {
  const cards = lesson.cards;
  const [phase, setPhase] = useState('learn');
  const [learnIdx, setLearnIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const quizRound = useMemo(() => buildQuizRound(cards), [cards]);

  function nextLearn() {
    if (learnIdx + 1 >= cards.length) setPhase('quiz');
    else setLearnIdx(i => i + 1);
  }

  function nextQuiz() {
    if (quizIdx + 1 >= quizRound.length) setPhase('done');
    else setQuizIdx(i => i + 1);
  }

  if (phase === 'done') {
    return (
      <div className="done-screen">
        <div className="done-trophy">🏆</div>
        <h2>Lesson Complete!</h2>
        <p>You learned {cards.length} Khmer words.</p>
        <button className="continue-btn" onClick={onComplete}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="lesson-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2 className="lesson-title">{lesson.title}</h2>

      {phase === 'learn' && (
        <FlashCard
          card={cards[learnIdx]}
          onNext={nextLearn}
          current={learnIdx + 1}
          total={cards.length}
        />
      )}

      {phase === 'quiz' && (
        <QuizCard
          card={quizRound[quizIdx].card}
          allCards={cards}
          type={quizRound[quizIdx].type}
          onNext={nextQuiz}
          current={quizIdx + 1}
          total={quizRound.length}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';

const TYPING_SPEED = 120;
const DELETING_SPEED = 80;
const PAUSE_AFTER_TYPED = 2000;
const PAUSE_AFTER_DELETED = 400;

export function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting | waiting

  const currentWord = words[wordIndex] || '';

  useEffect(() => {
    let timer;

    switch (phase) {
      case 'typing':
        if (text.length < currentWord.length) {
          timer = setTimeout(() => {
            setText(currentWord.slice(0, text.length + 1));
          }, TYPING_SPEED);
        } else {
          timer = setTimeout(() => setPhase('pausing'), 0);
        }
        break;

      case 'pausing':
        timer = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPED);
        break;

      case 'deleting':
        if (text.length > 0) {
          timer = setTimeout(() => {
            setText(text.slice(0, -1));
          }, DELETING_SPEED);
        } else {
          timer = setTimeout(() => setPhase('waiting'), 0);
        }
        break;

      case 'waiting':
        timer = setTimeout(() => {
          setWordIndex((prev) => (words.length ? (prev + 1) % words.length : 0));
          setPhase('typing');
        }, PAUSE_AFTER_DELETED);
        break;
    }

    return () => clearTimeout(timer);
  }, [text, phase, wordIndex, words, currentWord]);

  return text;
}

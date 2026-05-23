import { useState } from "react";

type GameWord = {
  category: string;
  word: string;
};

const words: GameWord[] = [
  { category: "Personajes bíblicos", word: "MOISES" },
  { category: "Personajes bíblicos", word: "DAVID" },
  { category: "Libros de la Biblia", word: "GENESIS" },
  { category: "Países", word: "MEXICO" },
];

export default function App() {
  const [currentWord, setCurrentWord] = useState(words[0]);

  const [remainingWords, setRemainingWords] = useState(words);

  const [revealedLetters, setRevealedLetters] = useState(
    Array(currentWord.word.length).fill(false),
  );

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const hiddenWord = currentWord.word
    .split("")
    .map((letter, index) => {
      return revealedLetters[index] ? letter : "_";
    })
    .join(" ");

  function changeWord() {
    let availableWords = remainingWords.filter(
      (word) => word.word !== currentWord.word,
    );

    if (availableWords.length === 0) {
      availableWords = words.filter((word) => word.word !== currentWord.word);
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);

    const newWord = availableWords[randomIndex];

    setCurrentWord(newWord);

    setRemainingWords(
      availableWords.filter((word) => word.word !== newWord.word),
    );

    setRevealedLetters(Array(newWord.word.length).fill(false));

    setCurrentLetterIndex(0);
  }

  function restartWord() {
    setRevealedLetters(Array(currentWord.word.length).fill(false));
    setCurrentLetterIndex(0);
  }

  function handleHit() {
    if (currentLetterIndex >= currentWord.word.length) {
      return;
    }

    const copy = [...revealedLetters];

    copy[currentLetterIndex] = true;

    setRevealedLetters(copy);
    setCurrentLetterIndex(currentLetterIndex + 1);
  }

  function handleMiss() {
    if (currentLetterIndex >= currentWord.word.length) {
      return;
    }

    setCurrentLetterIndex(currentLetterIndex + 1);
  }

  return (
    <div>
      <h1>Adivina la Palabra</h1>

      <h2>Categoría: {currentWord.category}</h2>

      <p>Palabra: {hiddenWord}</p>

      <p>
        Tiro: {currentLetterIndex} / {currentWord.word.length}
      </p>

      <button onClick={changeWord}>Cambiar palabra</button>

      <button onClick={handleHit}>Acierto</button>

      <button onClick={handleMiss}>Fallo</button>

      <button onClick={restartWord}>Reiniciar</button>
    </div>
  );
}

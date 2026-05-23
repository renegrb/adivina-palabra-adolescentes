import { useState } from "react";
import { words } from "./data/words";

export default function App() {
  const [currentWord, setCurrentWord] = useState(words[0]);

  const [remainingWords, setRemainingWords] = useState(words);

  const [revealedLetters, setRevealedLetters] = useState(
    Array(currentWord.word.length).fill(false),
  );

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const hiddenWord = getHiddenWord();

  const isRoundFinished = currentLetterIndex >= currentWord.word.length;

  function resetRound(word: string) {
    setRevealedLetters(Array(word.length).fill(false));
    setCurrentLetterIndex(0);
  }

  function goToNextLetter() {
    setCurrentLetterIndex((currentIndex) => currentIndex + 1);
  }

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

    resetRound(newWord.word);
  }

  function restartWord() {
    resetRound(currentWord.word);
  }

  function handleHit() {
    if (isRoundFinished) {
      return;
    }

    const copy = [...revealedLetters];

    copy[currentLetterIndex] = true;

    setRevealedLetters(copy);
    goToNextLetter();
  }

  function handleMiss() {
    if (isRoundFinished) {
      return;
    }

    goToNextLetter();
  }

  function showAnswer() {
    setRevealedLetters(Array(currentWord.word.length).fill(true));

    setCurrentLetterIndex(currentWord.word.length);
  }

  function getHiddenWord() {
    return currentWord.word
      .split("")
      .map((letter, index) => {
        return revealedLetters[index] ? letter : "_";
      })
      .join(" ");
  }

  return (
    <main>
      <section>
        <h1>Adivina la Palabra</h1>

        <h2>Categoría: {currentWord.category}</h2>

        <p>Palabra: {hiddenWord}</p>

        <p>
          Tiro: {currentLetterIndex} / {currentWord.word.length}
        </p>

        <div>
          <button onClick={changeWord}>Cambiar palabra</button>

          <button onClick={handleHit}>Acierto</button>

          <button onClick={handleMiss}>Fallo</button>

          <button onClick={restartWord}>Reiniciar</button>

          <button onClick={showAnswer}>Mostrar respuesta</button>
        </div>
      </section>
    </main>
  );
}

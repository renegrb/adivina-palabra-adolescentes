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

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
}

export default function App() {
  const [currentWord, setCurrentWord] = useState(words[0]);

  const [revealedLetters, setRevealedLetters] = useState(
    Array(currentWord.word.length).fill(false),
  );

  const hiddenWord = currentWord.word
    .split("")
    .map((letter, index) => {
      return revealedLetters[index] ? letter : "_";
    })
    .join(" ");

  function changeWord() {
    const newWord = getRandomWord();

    setCurrentWord(newWord);
    setRevealedLetters(Array(newWord.word.length).fill(false));
  }

  return (
    <div>
      <h1>Adivina la Palabra</h1>

      <h2>Categoría: {currentWord.category}</h2>

      <p>Palabra: {hiddenWord}</p>

      <button onClick={changeWord}>Cambiar palabra</button>

      <button
        onClick={() => {
          const copy = [...revealedLetters];
          copy[0] = true;
          setRevealedLetters(copy);
        }}
      >
        Revelar primera letra
      </button>
    </div>
  );
}

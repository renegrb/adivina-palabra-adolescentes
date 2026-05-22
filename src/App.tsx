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

  return (
    <div>
      <h1>Adivina la Palabra</h1>

      <h2>Categoría: {currentWord.category}</h2>

      <p>Palabra: {currentWord.word}</p>

      <button onClick={() => setCurrentWord(words[1])}>Cambiar palabra</button>
    </div>
  );
}

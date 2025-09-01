"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";


export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  let status;
  if (winner) {
    status = winner + " Kazandı";
  } else if (isDraw) {
    status = "Berabere"
  }
  else {
    status = "Hamle sırası " + (xIsNext ? "X' te" : "O' da");
  }

  function handleClick(i: any) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext === true) {
      nextSquares[i] = "X";
    } else if (xIsNext === false) {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function Square({ value, onSquareClick }: { value: any, onSquareClick: any }) {
    return (
      <button onClick={onSquareClick} className="bg-blue-300 w-24 h-24 border-2 border-white cursor-pointer text-4xl font-bold text-black hover:bg-cyan-400 transition-colors">{value}</button>

    );
  }

  function calculateWinner(squares: any) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }



  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-pink-300">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tic Tac Toe</h1>
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          {status}
        </div>
      </div>
      <section>
        <div className="grid grid-cols-3 gap-1 p-4 bg-sky-700 rounded-lg shadow-lg">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </section>

      <section>
        <button
          onClick={resetGame}
          className={`mt-6 p-5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-2xl transition-colors cursor-pointer ${winner || isDraw ? "animate-bounce" : null}`}
        >
          <RotateCcw />
        </button>
      </section>

    </main>
  );
}

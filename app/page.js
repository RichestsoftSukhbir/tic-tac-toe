'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';


function Square({value, onSquareClick}) {
  return (
    <>
      <li>
        <button className={styles.square}  onClick={onSquareClick}>{value}</button>
      </li>
    </>
  )
}

function calcWinner(square) {
  const winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i = 0; i < winCombination.length; i++) {
    const [a,b,c] = winCombination[i];
    if(square[a] && square[a] === square[b] && square[b] === square[c]) {
      return square[a];
    }
  }
  return null;
}

export default function Board() {
  const [xIsNext, setXisNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if(squares[i] || calcWinner(squares)) {
      return;
    }

    const nextSq = squares.slice();
    
    if(xIsNext) {
      nextSq[i] = 'X';
    } else {
      nextSq[i] = 'O';
    }

    setSquares(nextSq);
    setXisNext(!xIsNext);
  }

  const winner = calcWinner(squares);
  let status;

  if(winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1 className={styles.heading}>{status}</h1>
      <ul className={`${styles.board} ${styles.list_unstyled}`}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </ul>
    </>
  )
}

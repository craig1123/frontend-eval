import React, { useState } from 'react';
import styles from './ticTacToe.module.scss';

const initialGame = new Array(9).fill(null);

type Player = 'X' | 'O';

const calculateWin = (game: string[], player: Player) => {
  const winningArr = [
    [0, 1, 2], // horiz
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vert
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diag
    [2, 4, 6],
  ];

  for (let i = 0; i < winningArr.length; i += 1) {
    const arr = winningArr[i];
    let win = true;
    for (let j = 0; j < arr.length; j += 1) {
      const btnIndex = arr[j];
      if (game[btnIndex] !== player) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }

  return false;
};

const TicTacToe = () => {
  const [game, setGame] = useState<string[]>(initialGame);
  const [turn, setTurn] = useState<Player>('X');
  const [winner, setWinner] = useState(null);

  const handleButtonClick = (i) => () => {
    if (game[i] || winner) {
      return;
    }
    const updatedGame = [...game];
    updatedGame[i] = turn;
    setGame(updatedGame);
    const win = calculateWin(updatedGame, turn);
    if (win) {
      setWinner(`${turn} won the game`);
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setGame(initialGame);
    setTurn('X');
    setWinner(null);
  };

  return (
    <div>
      {!winner && <p>It is {turn}&apos;s turn</p>}
      {winner}
      <div className={styles['game-board']}>
        {game.map((square, i) => (
          <button type="button" className={styles['game-button']} key={i} onClick={handleButtonClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <button type="button" className={styles['reset-game']} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;

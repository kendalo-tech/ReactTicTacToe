import React from "react";
import "./TicTacToe.css";
import Board from "./Board";
import { useState } from "react";
import ResetButton from "./ResetButton";

const playerX = "X";
const playerO = "O";

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(playerX);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const checkWinner = (tiles) => {
    const combo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let comb of combo) {
      const [a, b, c] = comb;
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a]; //return winner
      }
    }

    return null;
  };

  const checkDraw = (tiles) => {
    return tiles.every((tiles) => tiles !== null);
  };

  const resetGame = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(playerX);
    setWinner(null);
    setDraw(false);
  };

  const TileClick = (index) => {
    if (tiles[index] !== null || winner !== null) {
      return;
    }

    const newTiles = [...tiles]; //immutability
    newTiles[index] = playerTurn; //set value
    setTiles(newTiles); //immutability

    const gameWinner = checkWinner(newTiles);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (checkDraw(newTiles)) {
      setDraw(true);
      //console.log("draw");
    }

    if (playerTurn === playerX) {
      setPlayerTurn(playerO);
    } else {
      setPlayerTurn(playerX);
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board tiles={tiles} OnTileClick={TileClick} />
      <div className="playAgain">
        {winner && <p>{`Player ${winner} wins! Press reset to play again!`}</p>}
        {draw && <p>The game is a draw! Press reset to play again!</p>}
      </div>
      <ResetButton onReset={resetGame} />
    </div>
  );
}

export default TicTacToe;

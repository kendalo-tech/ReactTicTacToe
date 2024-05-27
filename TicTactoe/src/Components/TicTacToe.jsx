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
  const [winLight, setWinLight] = useState(null);
  const [vsAI, setVsAi] = useState(null);

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
        return { winner: tiles[a], comb }; //return winner
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
    setWinLight(null);
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
      setWinner(gameWinner.winner);
      setWinLight(gameWinner.comb);
    } else if (checkDraw(newTiles)) {
      setDraw(true);
      //console.log("draw");
    }

    if (!gameWinner && !draw && vsAI) {
      setTimeout(async () => {
        await aiMove(newTiles);
      }, 500);
    }

    if (playerTurn === playerX) {
      setPlayerTurn(playerO);
    } else {
      setPlayerTurn(playerX);
    }
  };

  const toggleGameMode = () => {
    resetGame();
    setVsAi(!vsAI);
  };

  const aiMove = async (currentTiles) => {
    const response = await fetch("http://localhost:5000/next-move", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: currentTiles,
    });
    const data = await response.json();
    const { row, col } = data;
    const aiIndex = row * 3 + col;
    console.log(aiIndex);
    TileClick(aiIndex);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board tiles={tiles} OnTileClick={TileClick} winLight={winLight} />
      <div className="playAgain">
        {winner && <p>{`Player ${winner} wins! Press reset to play again!`}</p>}
        {draw && <p>The game is a draw! Press reset to play again!</p>}
      </div>
      <button className="switchButton" onClick={toggleGameMode}>
        {vsAI ? "Switch to Player vs Player" : "Switch to Player vs AI"}
      </button>
      <ResetButton onReset={resetGame} />
    </div>
  );
}

export default TicTacToe;

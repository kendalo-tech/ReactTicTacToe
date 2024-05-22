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

  const resetGame = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(playerX);
  };

  const TileClick = (index) => {
    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles]; //immutability
    newTiles[index] = playerTurn; //set value
    setTiles(newTiles); //immutability

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
      <ResetButton onReset={resetGame} />
    </div>
  );
}

export default TicTacToe;

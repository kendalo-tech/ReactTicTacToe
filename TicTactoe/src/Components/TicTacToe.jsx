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
    if (
      tiles[index] !== null ||
      winner !== null ||
      (vsAI && playerTurn === playerO)
    ) {
      return;
    }

    const newTiles = [...tiles]; //immutability
    newTiles[index] = playerTurn; //set value
    setTiles(newTiles); //immutability

    const gameWinner = checkWinner(newTiles);
    if (gameWinner) {
      setWinner(gameWinner.winner);
      setWinLight(gameWinner.comb);
      return;
    } else if (checkDraw(newTiles)) {
      setDraw(true);
      return;
      //console.log("draw");
    }

    if (playerTurn === playerX) {
      setPlayerTurn(playerO);
      console.log("Player turn" + playerTurn);
      if (vsAI) {
        setTimeout(() => aiMove(newTiles), 500);
      }
    } else {
      setPlayerTurn(playerX);
    }
  };

  const toggleGameMode = () => {
    resetGame();
    setVsAi(!vsAI);
  };

  // const aiMove = async (currentTiles) => {
  //   const response = await fetch("http://127.0.0.1:5000/next-move", {
  //     method: "POST",
  //     // mode: "no-cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: currentTiles,
  //   });
  //   const data = await response.json();
  //   const { row, col } = data;
  //   const aiIndex = row * 3 + col;
  //   console.log(aiIndex);
  //   TileClick(aiIndex);
  // };

  const aiMove = (company) => {
    console.log("test");
    fetch("http://127.0.0.1:5000/next-move", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company: company }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const row = data[0];
        const col = data[1];
        const aiIndex = row * 3 + col;
        console.log(aiIndex);
        makeAiMove(aiIndex, company);
        return data;
      });
  };

  const makeAiMove = (index, tiles) => {
    if (tiles[index] !== null || winner !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerO; // AI is always player O
    setTiles(newTiles);

    const gameWinner = checkWinner(newTiles);
    if (gameWinner) {
      setWinner(gameWinner.winner);
      setWinLight(gameWinner.comb);
      return;
    } else if (checkDraw(newTiles)) {
      setDraw(true);
      return;
    }

    setPlayerTurn(playerX); // Switch turn back to player X
  };

  //   const aiMove = (board) => {
  //     console.log("test")
  //     fetch('http://localhost:5000/test')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error fetching data:', error))
  // }

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

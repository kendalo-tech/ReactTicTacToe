import Tile from "./Tile";

function Board({ tiles, OnTileClick, winLight }) {
  return (
    <div className="board">
      <Tile
        onClick={() => OnTileClick(0)}
        value={tiles[0]}
        highlight={winLight && winLight.includes(0)}
      />
      <Tile
        onClick={() => OnTileClick(1)}
        value={tiles[1]}
        highlight={winLight && winLight.includes(1)}
      />
      <Tile
        onClick={() => OnTileClick(2)}
        value={tiles[2]}
        highlight={winLight && winLight.includes(2)}
      />
      <Tile
        onClick={() => OnTileClick(3)}
        value={tiles[3]}
        highlight={winLight && winLight.includes(3)}
      />
      <Tile
        onClick={() => OnTileClick(4)}
        value={tiles[4]}
        highlight={winLight && winLight.includes(4)}
      />
      <Tile
        onClick={() => OnTileClick(5)}
        value={tiles[5]}
        highlight={winLight && winLight.includes(5)}
      />
      <Tile
        onClick={() => OnTileClick(6)}
        value={tiles[6]}
        highlight={winLight && winLight.includes(6)}
      />
      <Tile
        onClick={() => OnTileClick(7)}
        value={tiles[7]}
        highlight={winLight && winLight.includes(7)}
      />
      <Tile
        onClick={() => OnTileClick(8)}
        value={tiles[8]}
        highlight={winLight && winLight.includes(8)}
      />
    </div>
  );
}

export default Board;

function Tile({ value, onClick, highlight }) {
  let className = "tile";
  if (highlight) {
    className += " highlight";
  }

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

export default Tile;

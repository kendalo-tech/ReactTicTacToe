function Tile({ value, onClick }) {
  return (
    <div onClick={onClick} className="tile">
      {value}
    </div>
  );
}

export default Tile;

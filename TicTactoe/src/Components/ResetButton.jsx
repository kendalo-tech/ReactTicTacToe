function ResetButton({ onReset }) {
  return (
    <div className="resetBack">
      <button onClick={onReset} className="reset">
        RESET GAME
      </button>
    </div>
  );
}

export default ResetButton;

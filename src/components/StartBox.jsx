import LevelOptions from "./LevelOptions";
import "../styles/StartBox.css";

const StartBox = ({ getDifficultyLevel }) => {
  return (
    <div className="nes-container start-box is-rounded">
      <p>Select a difficulty level</p>
      <LevelOptions getDifficultyLevel={getDifficultyLevel} />
    </div>
  );
};

export default StartBox;

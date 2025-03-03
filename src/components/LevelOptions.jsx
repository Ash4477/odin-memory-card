import "../styles/LevelOptions.css";
import { FaArrowRight } from "react-icons/fa";

const LevelOptions = ({ getDifficultyLevel }) => {
  return (
    <ul className="levels-list">
      <li>
        <FaArrowRight className="btn-arrow" />
        <button onClick={() => getDifficultyLevel("EASY")}>Easy</button>
      </li>
      <li>
        <FaArrowRight className="btn-arrow" />
        <button onClick={() => getDifficultyLevel("MEDIUM")}>Medium</button>
      </li>
      <li>
        <FaArrowRight className="btn-arrow" />
        <button onClick={() => getDifficultyLevel("HARD")}>Hard</button>
      </li>
    </ul>
  );
};

export default LevelOptions;

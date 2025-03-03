import { useState } from "react";
import StartBox from "./components/StartBox";
import "nes.css/css/nes.min.css";
import "./App.css";
import GameBox from "./components/GameBox";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  let gameLevel = "";

  const getDifficultyLevel = (level) => {
    setIsGameOn(true);
    gameLevel = level;
  };

  if (isGameOn) return <GameBox level={gameLevel} />;
  else {
    return <StartBox getDifficultyLevel={getDifficultyLevel} />;
  }
}

export default App;

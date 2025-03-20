import { useState } from "react";
import StartBox from "./components/StartBox";
import "nes.css/css/nes.min.css";
import "./App.css";
import GameBox from "./components/GameBox";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [totalCards, setTotalCards] = useState(4);

  const getDifficultyLevel = (level) => {
    setIsGameOn(true);
    switch (level) {
      case "EASY":
        setTotalCards(4);
        break;
      case "MEDIUM":
        setTotalCards(7);
        break;
      case "HARD":
        setTotalCards(10);
        break;
      default:
        break;
    }
  };

  const returnMenu = () => setIsGameOn(false);

  return (
    <>
      {isGameOn ? (
        <GameBox totalCards={totalCards} returnMenu={returnMenu} />
      ) : (
        <StartBox getDifficultyLevel={getDifficultyLevel} />
      )}
    </>
  );
}

export default App;

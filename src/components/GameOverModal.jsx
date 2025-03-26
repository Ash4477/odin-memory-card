import { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";

const GameOverModal = ({
  isModalOpen,
  setIsModalOpen,
  isGameOver,
  resetGame,
  returnMenu,
}) => {
  const [gameOverImageUrl, setGameOverImageUrl] = useState("");

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const fetchGIF = async () => {
      try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=R8W7zlVPaABPJARkY0G3z543Ue2Apd4g&q=${
          isGameOver ? "happy+pokemon" : "sad+pokemon"
        }&limit=1&offset=1&rating=g&lang=en&bundle=messaging_non_clips`;
        const response = await fetch(url, {
          mode: "cors",
          signal: controller.signal,
        });
        if (!ignore) {
          const data = await response.json();
          setGameOverImageUrl(data.data[0].images.original.url);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Fetch Error", error);
        }
      }
    };

    fetchGIF();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [isGameOver]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Game Over"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          backgroundColor: "white",
          maxWidth: "400px",
          maxHeight: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          gap: "1rem",
        },
      }}
    >
      {gameOverImageUrl == 0 ? (
        <p style={{ margin: "auto" }}>Loading...</p>
      ) : (
        <img
          src={gameOverImageUrl}
          alt="gameover gif"
          width={200}
          height={150}
          style={{ margin: "auto" }}
        />
      )}

      {isGameOver ? (
        <h2 style={{ textAlign: "center" }}>Congrats, You Won!</h2>
      ) : (
        <h2 style={{ textAlign: "center" }}>You Lost!</h2>
      )}

      <button
        className="nes-btn"
        onClick={() => {
          resetGame();
          setIsModalOpen(false);
        }}
      >
        Play Again ?
      </button>
      <button
        className="nes-btn"
        onClick={() => {
          setIsModalOpen(false);
          returnMenu();
        }}
      >
        Go back to Menu
      </button>
    </Modal>
  );
};

export default GameOverModal;

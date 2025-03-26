import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import PokeCard from "./PokeCard";
import GameOverModal from "./GameOverModal";
import "../styles/GameBox.css";

const GameBox = ({ totalCards, returnMenu }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardCount, setCardCount] = useState({ current: 0, total: totalCards });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const fetchPokemonData = async () => {
      try {
        // const url = `https://pokeapi.co/api/v2/pokemon?offset=${totalCards}&limit=${totalCards}`;
        const url = `http://34.201.66.178:5000/api?limit=${totalCards}`;
        const response = await fetch(url, {
          mode: "cors",
          signal: controller.signal,
        });
        if (!ignore) {
          const data = await response.json();
          const pokeList = data.map((data, index) => {
            return {
              pokeId: index,
              pokeName: data.pokeName,
              pokeImageUrl: data.pokeImageUrl,
              clicked: false,
            };
          });

          setPokemonList(pokeList);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("fetch error: ", error);
        }
      }
    };

    fetchPokemonData();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [totalCards]);

  const isGameOver = cardCount.current + 1 >= cardCount.total;

  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (pokeId, clicked) => {
    if (isGameOver) {
      setIsModalOpen(true);
      return;
    }
    if (clicked) {
      setIsModalOpen(true);
      return;
    }

    setPokemonList(
      shuffleArray(
        pokemonList.map((data) => {
          if (data["pokeId"] === pokeId) {
            return { ...data, clicked: true };
          }

          return data;
        })
      )
    );
    setCardCount({ ...cardCount, current: cardCount.current + 1 });
  };

  const resetGame = () => {
    setCardCount({ current: 0, total: totalCards });
    setPokemonList((prevList) =>
      prevList.map((data) => {
        return { ...data, clicked: false };
      })
    );
  };

  return (
    <div className="game-box">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <GameOverModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isGameOver={isGameOver}
            resetGame={resetGame}
            returnMenu={returnMenu}
          />
          <div className="gamebox-header">
            <h1>
              <img src="/pokeball.png" alt="pokeball" />
              <span className="red">Poké</span>Memo
            </h1>
            <p>
              {cardCount["current"]}/{cardCount["total"]}
            </p>
          </div>

          <ul className="poke-list">
            {pokemonList.map((data, idx) => (
              <li
                key={idx}
                onClick={() => handleCardClick(data["pokeId"], data["clicked"])}
              >
                <PokeCard
                  name={data["pokeName"]}
                  imageUrl={data["pokeImageUrl"]}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GameBox;

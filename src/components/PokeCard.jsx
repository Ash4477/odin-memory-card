import Tilt from "react-parallax-tilt";
import "../styles/PokeCard.css";

const PokeCard = ({ name, imageUrl }) => {
  return (
    <Tilt
      tiltReverse={true}
      glareEnable={true}
      glareColor="#fff"
      transitionSpeed={1000}
    >
      <div className="poke-card">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </Tilt>
  );
};

export default PokeCard;

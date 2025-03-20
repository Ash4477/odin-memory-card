import pokeballImage from "../assets/pokeball.png";
import "../styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-box">
      <img className="loading-image" src={pokeballImage} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

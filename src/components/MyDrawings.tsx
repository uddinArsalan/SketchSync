import "../CSS/MyDrawings.css";
import { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";

interface DrawingCardProps {
  src: string;
  title: string;
}

const DrawingCard: React.FC<DrawingCardProps> = ({ src, title }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="drawing-card">
      <img src={src} alt={title} className="drawing-card__image" />
      <div className="drawing-card__overlay">
        <h3 className="drawing-card__title">{title}</h3>
        <button 
          className={`drawing-card__favorite ${isFavorite ? 'drawing-card__favorite--active' : ''}`} 
          onClick={toggleFavorite}
        >
          ♥
        </button>
      </div>
      <details className="drawing-card__details">
        <summary>More Info</summary>
        <p>Created on: {new Date().toLocaleDateString()}</p>
        <p>Size: 1024x768</p>
      </details>
    </div>
  );
};

const MyDrawings: React.FC = () => {
  const { myDrawingData } = useFirebase();
  const drawings = Object.values(myDrawingData);

  return (
    <div className="my-drawings">
      <h1 className="my-drawings__heading">My Drawings</h1>
      <p className="my-drawings__description">Here you can view your saved drawings.</p>
      <div className="my-drawings__grid">
        {drawings.map((drawing, index) => (
          <DrawingCard 
            key={index} 
            src={drawing.usersData} 
            title={`Drawing ${index + 1}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default MyDrawings;
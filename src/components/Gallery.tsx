import "../CSS/gallery.css";
import { useFirebase } from "../context/FirebaseContext";

interface GalleryCardProps {
  src: string;
  title: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ src, title }) => {
  return (
    <div className="gallery-card">
      <img src={src} alt={title} className="gallery-card__image" />
      <div className="gallery-card__overlay">
        <h3 className="gallery-card__title">{title}</h3>
        <button className="gallery-card__favorite">♥</button>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const { galleryData } = useFirebase();
  const drawings = Object.values(galleryData);

  return (
    <div className="gallery">
      <h1 className="gallery__heading">Our Gallery</h1>
      <p className="gallery__description">Here you can view your saved drawings.</p>
      <div className="gallery__grid">
        {drawings.map((drawing, index) => (
          <GalleryCard 
            key={index} 
            src={drawing.usersData} 
            title={`Drawing ${index + 1}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

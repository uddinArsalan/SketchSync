import "../CSS/gallery.css"
import { useContext } from "react"
import { FirebaseContext } from "../context/FirebaseContext"

const GalleryCard = ({src} : any) => {
    return (
        <div className="gallery-card">
            <img src={src} alt="" className="img" />
            {/* <details></details> */}
            {/* <div>Favourites</div> */}
        </div>
    )
}

const Gallery = () => {
    const {galleryData} = useContext(FirebaseContext)
    const newArray =  Object.values(galleryData) 
    return (
        <div className="galleyContainer">
            <div className="GalleryHeading">Our Gallery</div>
            <div className="heading-description">Here You can view your drawings you save.</div>
            <div className="galleryGrid">
               {newArray.map((src,index) => {
                return <GalleryCard src={src.usersData} key={index}/>
               })}
            </div>
        </div>
    )
}

export default Gallery
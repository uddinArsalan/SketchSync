import "../CSS/gallery.css"
import { useContext } from "react"
import { FirebaseContext } from "../context/FirebaseContext"

const DrawingCard = ({src} : any) => {
    return (
        <div className="gallery-card">
            <img src={src} alt="" className="img" />
            <details></details>
            <div>Favourites</div>
        </div>
    )
}

const MyDrawings = () => {
    const {myDrawingData} = useContext(FirebaseContext)
    const newArray =  Object.values(myDrawingData) 
    return (
        <div className="galleyContainer">
            <div className="GalleryHeading">My Drawings</div>
            <div className="heading-description">Here You can view your drawings you save.</div>
            <div className="galleryGrid">
               {newArray.map((src,index) => {
                return <DrawingCard src={src.usersData} key={index}/>
               })}
            </div>
        </div>
    )
}

export default MyDrawings
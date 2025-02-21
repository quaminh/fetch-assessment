import './DogCard.css'
import LikeButton from '../LikeButton/LikeButton'
import { Dog } from '../../lib/types'
import LocationIcon from "../../assets/location.svg"

type DogCardProps = {
    handleLikeUnlike: Function,
    dogObject: Dog,
    liked: boolean
}

export default function DogCard({ handleLikeUnlike, dogObject, liked } : DogCardProps) {
    return (
        <div className="dogCard">
            <div className="header">
                <h1 className="name">{dogObject.name}</h1>
                <LikeButton onClick={() => {
                    handleLikeUnlike(dogObject, liked);
                }} liked={liked} />
            </div>
            <div className="dogImage">
                <img className="dogImg" src={dogObject.img} alt={`Photo of the dog ${dogObject.name}`} />
            </div>
            <h2 className="breed">{dogObject.breed}</h2>
            <h3 className="age">Age: {dogObject.age}</h3>
            <div className="location-info">
                <img className="icon" src={LocationIcon} alt="Location icon" />
                <h4 className="zipCode">{dogObject.zip_code}</h4>
            </div>
        </div>
    )
}
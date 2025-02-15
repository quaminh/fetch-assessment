import './DogCard.css'
import LikeButton from '../LikeButton/LikeButton'
import { Dog } from '../../lib/types'

type DogCardProps = {
    handleLikeUnlike: Function,
    dogObject: Dog,
    liked: boolean
}

export default function DogCard({ handleLikeUnlike, dogObject, liked } : DogCardProps) {
    return (
        <div className="dogCard">
            <div className="container">
                <h1 className="name">{dogObject.name}</h1>
                <h2 className="age">{dogObject.age}</h2>
                <h3 className="breed">{dogObject.breed}</h3>
                <h4 className="zipCode">{dogObject.zip_code}</h4>
                <LikeButton onClick={() => {
                    handleLikeUnlike(dogObject, liked);
                }} liked={liked} />
            </div>
            <img src={dogObject.img} />
        </div>
    )
}
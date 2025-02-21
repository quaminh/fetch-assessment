import "./MatchedDog.css"
import { Dog } from "../../lib/types"
import locationIcon from "../../assets/location.svg"

export default function MatchedDog({ dogObject } : { dogObject: Dog }) {
    return (
        <div className="flex-col center-align matchedDog">
            {dogObject.img &&
            <>
            <h1><em>Your dog match is:</em></h1>
            <h1>{dogObject.name.toUpperCase()}</h1>
            <img className="matchedDogImg" src={dogObject.img} alt={`Photo of the dog ${dogObject.name}`} />
            <h2>{dogObject.breed}</h2>
            <div className="location-info">
                <img className="icon icon-invert" src={locationIcon} alt="Location icon" />
                <h3>{dogObject.zip_code}</h3>
            </div>
            </>
            }
        </div>
    )
}
import "./MatchedDog.css"
import { Dog } from "../../lib/types"

export default function MatchedDog({ dogObject } : { dogObject: Dog }) {
    return (
        <div>
            <h1>{dogObject.name}</h1>
            {dogObject.img && <img src={dogObject.img} alt={`Photo of the dog ${dogObject.name}`} />}
            <h2>{dogObject.breed}</h2>
            <h3>{dogObject.zip_code}</h3>
        </div>
    )
}
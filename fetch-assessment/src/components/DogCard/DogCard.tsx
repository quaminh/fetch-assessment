import './DogCard.css'

type Dog = {
    id: string,
    img: string,
    name: string,
    age: number,
    zip_code: string,
    breed: string
}

export default function DogCard({ dogObject } : { dogObject: Dog }) {
    return (
        <div className="dogCard">
            <div className="container">
                <h1 className="name">{dogObject.name}</h1>
                <h2 className="age">{dogObject.age}</h2>
                <h3 className="breed">{dogObject.breed}</h3>
                <h4 className="zipCode">{dogObject.zip_code}</h4>
            </div>
            <img src={dogObject.img} />
        </div>
    )
}
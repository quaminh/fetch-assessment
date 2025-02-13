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
        <div>
            <h1>{dogObject.name}</h1>
            <h2>{dogObject.age}</h2>
            <h3>{dogObject.breed}</h3>
            <h4>{dogObject.zip_code}</h4>
        </div>
    )
}
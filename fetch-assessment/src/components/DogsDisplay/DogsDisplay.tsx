import "./DogsDisplay.css"
import DogCard from '../../components/DogCard/DogCard'

const testDogs = [
    {
      id: "0",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg",
      name: "Dog1",
      age: 1,
      zip_code: "11111",
      breed: "breed1"
    },
    {
      id: "1",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg",
      name: "Dog2",
      age: 2,
      zip_code: "22222",
      breed: "breed2"
    },
    {
      id: "2",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg",
      name: "Dog3",
      age: 3,
      zip_code: "33333",
      breed: "breed3"
    }
  ]

export default function DogsDisplay() {
    return (
        <div className="dogsDisplay">
            {testDogs.map((dog) => (<DogCard dogObject={dog} />))}
        </div>
    )
}
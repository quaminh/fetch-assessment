import { useState } from 'react'
import './App.css'
import * as api from './api.ts'
import Title from './components/Title/Title'
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm'
import DogsDisplay from './components/DogsDisplay/DogsDisplay.tsx'
import DogCard from './components/DogCard/DogCard'
import { Dog } from './lib/types'

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

function App() {
  const [likedDogs, setLikedDogs] = useState<Dog[]>([]);

  const handleLikeUnlike = (dogObject: Dog, liked: boolean) => {
    if (!liked) {
      setLikedDogs((prev) => [...prev, dogObject]);
    }
    else {
      setLikedDogs((prev) => prev.filter((d) => d.id !== dogObject.id));
    }
  };

  return (
    <>
      <Title>Fetch a Dog!</Title>
      <AuthenticationForm />
      <button onClick={api.logout}>Logout</button>
      <button onClick={api.getDogBreeds}>Dog Breeds</button>
      <button onClick={api.searchDogs}>Search Dogs</button>
      <button onClick={api.getDogs}>Get Dogs</button>

      <DogsDisplay>
        {testDogs.map((dog) => (<DogCard handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={likedDogs.includes(dog)}/>))}
      </DogsDisplay>
      <DogsDisplay>
        {likedDogs.map((dog) => (<DogCard handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={true}/>))}
      </DogsDisplay>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import * as api from './api.ts'
import Title from './components/Title/Title'
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm'
import DogsDisplay from './components/DogsDisplay/DogsDisplay.tsx'
import DogCard from './components/DogCard/DogCard'
import { Dog, Match } from './lib/types'

const emptyDog: Dog = {
  id: "",
  img: "",
  name: "",
  breed: "",
  age: 0,
  zip_code: ""
}

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [likedDogs, setLikedDogs] = useState<Dog[]>([]);
  const [searchedDogs, setSearchedDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string>("");
  const [prev, setPrev] = useState<string>("");
  const [matchedDog, setMatchedDog] = useState<Dog>(emptyDog);

  const handleLikeUnlike = (dogObject: Dog, liked: boolean) => {
    if (!liked) {
      setLikedDogs((prev) => [...prev, dogObject]);
    }
    else {
      setLikedDogs((prev) => prev.filter((d) => d.id !== dogObject.id));
    }
  };

  const handleSearch = async (endpoint: string = "") => {
    const response = await api.searchDogs(endpoint);
    const dogIds = response.resultIds;
    setNext(response.next);
    setPrev(response.prev);
    const dogArray = await api.getDogs(dogIds);
    setSearchedDogs(dogArray);
  };

  const handleMatch = async () => {
    const matchedDog: Match = await api.matchDog(likedDogs.map((dog) => dog.id));
    const matchedDogObject: Dog[] = await api.getDogs([matchedDog.match]);
    setMatchedDog(matchedDogObject[0]);
  };

  return (
    <>
      <Title>Fetch a Dog!</Title>
      <AuthenticationForm />
      <button onClick={() => api.logout()}>Logout</button>
      <button onClick={() => api.getDogBreeds()}>Dog Breeds</button>
      <button onClick={() => handleSearch()}>Search Dogs</button>
      <button onClick={() => handleSearch(next)}>Next</button>
      <button onClick={() => handleSearch(prev)}>Prev</button>
      <button onClick={() => handleMatch()}>Match</button>

      <DogsDisplay>
        {searchedDogs.map((dog) => (<DogCard handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={likedDogs.includes(dog)}/>))}
      </DogsDisplay>
      <DogsDisplay>
        {likedDogs.map((dog) => (<DogCard handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={true}/>))}
      </DogsDisplay>

      <DogsDisplay>
        <DogCard handleLikeUnlike={handleLikeUnlike} dogObject={matchedDog} liked={true} />
      </DogsDisplay>
    </>
  )
}

export default App

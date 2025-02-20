import { useState, useEffect } from 'react'
import './App.css'
import * as api from './api.ts'
import Title from './components/Title/Title'
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm'
import DogsDisplay from './components/DogsDisplay/DogsDisplay.tsx'
import DogCard from './components/DogCard/DogCard'
import SearchFilters from './components/SearchFilters/SearchFilters.tsx'
import { Dog, Match } from './lib/types'
import Heading from './components/Heading/Heading.tsx'
import MatchedDog from './components/MatchedDog/MatchedDog.tsx'

const emptyDog: Dog = {
  id: "",
  img: undefined,
  name: "",
  breed: "",
  age: 0,
  zip_code: ""
}

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [likedDogs, setLikedDogs] = useState<Dog[]>([]);
  const [searchedDogs, setSearchedDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string>("");
  const [prev, setPrev] = useState<string>("");
  const [matchedDog, setMatchedDog] = useState<Dog>(emptyDog);

  useEffect(() => {
    if (loggedIn) {
      api.getDogBreeds().then((breeds) => setAllBreeds(breeds))
                        .catch((err) => console.error(err));
    }
  }, [loggedIn])

  const handleLogin = async (formData: FormData) => {
    const status = await api.login(formData);
    if (status === 200) {
      setLoggedIn(true);
      alert("Logged in successfully!");
      handleSearch();
    }
  };

  const handleLogout = async () => {
    const status = await api.logout();
    if (status === 200) {
      setLoggedIn(false);
      alert("Logged out successfully");
    }
  };

  const handleLikeUnlike = (dogObject: Dog, liked: boolean) => {
    if (!liked) {
      setLikedDogs((prev) => [...prev, dogObject]);
    }
    else {
      setLikedDogs((prev) => prev.filter((d) => d.id !== dogObject.id));
    }
  };

  const handleSearch = async (endpoint: string = "",
                              sortOrder: "ascending"|"descending" = "ascending",
                              breeds?: string[],
                              zipCodes?: string[],
                              ageMin?: number,
                              ageMax?: number) => {
    const response = await api.searchDogs(endpoint, sortOrder, breeds, zipCodes, ageMin, ageMax);
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
      {!loggedIn ?
      <>
      <Title>Fetch a Dog!</Title>
      <AuthenticationForm handleLogin={handleLogin} />
      </> :
      <>
      <button onClick={() => handleLogout()}>Logout</button>
      
      <Heading text="Step 1: Search for your favorite dogs!" />
      <SearchFilters allBreeds={allBreeds} handleSearch={handleSearch} />
      <button onClick={() => handleSearch(next)}>Next</button>
      <button onClick={() => handleSearch(prev)}>Prev</button>
      <DogsDisplay>
        {searchedDogs.map((dog) => (<DogCard key={dog.id} handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={likedDogs.map((dog) => dog.id).includes(dog.id)}/>))}
      </DogsDisplay>

      <Heading text="Step 2: Like your favorite dogs!" />
      <DogsDisplay>
        {likedDogs.map((dog) => (<DogCard key={dog.id} handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={true}/>))}
      </DogsDisplay>

      <Heading text="Step 3: Find your doggy match!" />
      <button onClick={() => handleMatch()}>Match</button>
      <MatchedDog dogObject={matchedDog} />
      </>}
    </>
  )
}

export default App

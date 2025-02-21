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
import SmallMessage from './components/SmallMessage/SmallMessage.tsx'
import ArrowButton from './components/ArrowButton/ArrowButton.tsx'

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
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [next, setNext] = useState<string>("");
  const [prev, setPrev] = useState<string>("");
  const [matchedDog, setMatchedDog] = useState<Dog>(emptyDog);

  useEffect(() => {
    if (loggedIn) {
      api.getDogBreeds().then((breeds) => setAllBreeds(breeds))
                        .catch((err) => console.error(err));
    }
  }, [loggedIn])

  const incrementPage = () => {
    if (pageNumber < (totalDogs / 25)) {
      setPageNumber(pageNumber + 1);
    }
  };

  const decrementPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

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

  const handleNextPage = async () => {
    await handleSearch(next);
    incrementPage();
  };

  const handlePrevPage = async () => {
    await handleSearch(prev);
    decrementPage();
  };

  const handleSearch = async (endpoint: string = "",
                              sortOrder: "ascending"|"descending" = "ascending",
                              breeds?: string[],
                              zipCodes?: string[],
                              ageMin?: number,
                              ageMax?: number) => {
    const response = await api.searchDogs(endpoint, sortOrder, breeds, zipCodes, ageMin, ageMax);
    const dogIds = response.resultIds;
    setTotalDogs(response.total);
    setNext(response.next);
    setPrev(response.prev);
    const dogArray = await api.getDogs(dogIds);
    setSearchedDogs(dogArray);
    if (!endpoint) {
      setPageNumber(0);
    }
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
      <div className="flex-col center-align full-height">
        <Title>FETCH A DOG!</Title>
        <AuthenticationForm handleLogin={handleLogin} />
      </div>
      </> :
      <>
      <button onClick={() => handleLogout()}>Logout</button>
      
      <Heading text="Step 1: Search for your favorite dogs!" />
      <SearchFilters allBreeds={allBreeds} handleSearch={handleSearch} />

      <div className="flex-col center-align stepOneContainer">
        <div className="flex-row light-bg pageBtns">
          {prev && <ArrowButton onClick={() => handlePrevPage()} />}
          <SmallMessage text={`Showing ${pageNumber*25+1}-${(pageNumber+1)*25} of ${totalDogs} dogs`} />
          {next && <ArrowButton onClick={() => handleNextPage()} pointRight={true} />}
        </div>

        <DogsDisplay>
          {searchedDogs.map((dog) => (<DogCard key={dog.id} handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={likedDogs.map((dog) => dog.id).includes(dog.id)}/>))}
        </DogsDisplay>

        <div className="flex-row light-bg pageBtns">
          {prev && <ArrowButton onClick={() => handlePrevPage()} />}
          <SmallMessage text={`Showing ${pageNumber*25+1}-${(pageNumber+1)*25} of ${totalDogs} dogs`} />
          {next && <ArrowButton onClick={() => handleNextPage()} pointRight={true} />}
        </div>
      </div>

      <Heading text="Step 2: Like your favorite dogs!" />
      <div className="center-align light-bg">
        <DogsDisplay>
          {likedDogs.map((dog) => (<DogCard key={dog.id} handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={true}/>))}
        </DogsDisplay>
      </div>

      <Heading text="Step 3: Find your doggy match!" />
      <button onClick={() => handleMatch()}>Match</button>
      <MatchedDog dogObject={matchedDog} />
      </>}
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import './App.css'
import * as api from './api'
import Title from './components/Title/Title'
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import DogsDisplay from './components/DogsDisplay/DogsDisplay'
import DogCard from './components/DogCard/DogCard'
import SearchFilters from './components/SearchFilters/SearchFilters'
import Heading from './components/Heading/Heading'
import Subheading from './components/Subheading/Subheading'
import MatchedDog from './components/MatchedDog/MatchedDog'
import SmallMessage from './components/SmallMessage/SmallMessage'
import ArrowButton from './components/ArrowButton/ArrowButton'
import Button from './components/Button/Button'
import { Dog, Match } from './lib/types'
import pawImage from './assets/paw.svg'

// Empty dog object to act as placeholder for the matched dog
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
    const fetchData = async () => {
      const breeds = await api.getDogBreeds();
      if (!breeds) return;
      setAllBreeds(breeds);
      handleSearch();
    }

    fetchData();
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
    }
    else {
      alert("Error: Something went wrong.");
    }
  };

  const handleLogout = async () => {
    const status = await api.logout();
    if (status === 200) {
      setLoggedIn(false);
      alert("Logged out successfully");
    }
    else {
      alert("Error: Something went wrong.");
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
    if (!response) return;
    const dogIds = response.resultIds;
    setTotalDogs(response.total);
    setNext(response.next);
    setPrev(response.prev);
    const dogArray = await api.getDogs(dogIds);
    if (!dogArray) return;
    setSearchedDogs(dogArray);
    if (!endpoint) {
      setPageNumber(0);
    }
  };

  const handleMatch = async () => {
    if (likedDogs.length > 0) {
      const matchedDog: Match = await api.matchDog(likedDogs.map((dog) => dog.id));
      if (!matchedDog) return;
      const matchedDogObject: Dog[] = await api.getDogs([matchedDog.match]);
      if (!matchedDogObject) return;
      setMatchedDog(matchedDogObject[0]);
    }
    else {
      alert("You haven't liked any dogs yet!");
    }
  };

  return (
    <>
      {!loggedIn ?
      <>
      <div className="flex-col center-align full-height">
        <img className="pawImg" src={pawImage} alt="Dog paw vector image" />
        <Title>FETCH A DOG!</Title>
        <AuthenticationForm handleLogin={handleLogin} />
      </div>
      </> :
      <div className="flex-col section-gap">
        <Header handleLogout={handleLogout} />

        <div>
          <Heading text="Step 1: Search for your favorite dogs!" leftMargin={true} />
          <Subheading text="Use the filters to find your preferences and like your favorites!" />
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
        </div>

        <div>
          <Heading text="Step 2: Like your favorite dogs!" leftMargin={true} />
          <Subheading text="Your liked dogs will show up below!" />
          <div className="center-align light-bg container">
            {likedDogs.length > 0 ?
              <DogsDisplay overflow={true}>
                {likedDogs.map((dog) => (<DogCard key={dog.id} handleLikeUnlike={handleLikeUnlike} dogObject={dog} liked={true}/>))}
              </DogsDisplay> :
              <SmallMessage text="No dogs liked yet... Give a heart to some of them above!" />}
          </div>
        </div>

        <div>
          <Heading text="Step 3: Find your doggy match!" leftMargin={true} />
          <Subheading text="Once you have liked your favorites, it's time to find your match!" />
          <div className="flex-col center-align light-bg container">
            <MatchedDog dogObject={matchedDog} />
            <Button onClick={() => handleMatch()} text="Match!" />
          </div>
        </div>
      </div>}
      <Footer />
    </>
  )
}

export default App

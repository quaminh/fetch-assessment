import './App.css'
import Title from './components/Title/Title'
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm'
import DogCard from './components/DogCard/DogCard'

const testDogs = [
  {
    id: "0",
    img: "string",
    name: "Dog1",
    age: 1,
    zip_code: "11111",
    breed: "breed1"
  },
  {
    id: "1",
    img: "string",
    name: "Dog2",
    age: 2,
    zip_code: "22222",
    breed: "breed2"
  },
  {
    id: "2",
    img: "string",
    name: "Dog3",
    age: 3,
    zip_code: "33333",
    breed: "breed3"
  }
]

function App() {
  return (
    <>
      <Title>Fetch a Dog!</Title>
      <AuthenticationForm />
      {testDogs.map((dog) => (
        <DogCard dogObject={dog} />
      ))}
    </>
  )
}

export default App

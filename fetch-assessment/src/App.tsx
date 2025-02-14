import './App.css'
import * as api from './api.ts'
import Title from './components/Title/Title'
import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm'
import DogsDisplay from './components/DogsDisplay/DogsDisplay.tsx'

function App() {
  return (
    <>
      <Title>Fetch a Dog!</Title>
      <AuthenticationForm />
      <button onClick={api.logout}>Logout</button>
      <button onClick={api.getDogBreeds}>Dog Breeds</button>
      <button onClick={api.searchDogs}>Search Dogs</button>
      <button onClick={api.getDogs}>Get Dogs</button>

      <DogsDisplay />
    </>
  )
}

export default App

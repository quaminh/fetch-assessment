import { useState } from 'react'
import './App.css'
import Title from './components/Heading/Title'
import AuthenticationForm from './components/InputBox/AuthenticationForm'

function App() {

  return (
    <>
      <Title>Fetch a Dog!</Title>
      <AuthenticationForm />
    </>
  )
}

export default App

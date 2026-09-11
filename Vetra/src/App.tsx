import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './App/Home'
import './App.css'

function App() {
  return (
    <>
    <div className="">
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
        </Route>
      </Routes>
    </div>
    </>
  )
}

export default App

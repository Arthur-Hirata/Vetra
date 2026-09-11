import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import './App.css'

function App() {
  return (
    <>
    <div className="">
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
        </Route>
        <Route path="/login"element={<Login/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App

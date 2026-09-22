import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AccountCreate from './pages/AccountCreate/AccountCreate'
import TooManyRequests from './pages/TooManyRequests/TooManyRequests'
import Profile from './pages/Profile/Profile'
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
        <Route path='/create' element={<AccountCreate />}/>
        <Route path="/too-many-requests" element={<TooManyRequests/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App

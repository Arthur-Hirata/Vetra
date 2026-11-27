import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AccountCreate from './pages/AccountCreate/AccountCreate'
import TooManyRequests from './pages/TooManyRequests/TooManyRequests'
import Profile from './pages/Profile/Profile'
import DetailProduct from './pages/Home/Components/Products/DetailProduct'
import CategoriesSection from './pages/Home/Components/Categories/CategoriesSection'
import AllProducts from './pages/Home/Components/Products/AllProducts'
import './App.css'

function App() {
  return (
    <>
    <div className="">
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path='/products/:id' element={<DetailProduct/>}/>
          <Route path='/categories/:categorySlug' element={<CategoriesSection/>}/>
          <Route path='/products' element={<AllProducts/>} />
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

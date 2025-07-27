import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.log("App :: getCurrentUser error ⛔", error);
        dispatch(logout()); // ensure app doesn't stay stuck
      })
      .finally(() => setLoading(false))  //Loading over
  }, [dispatch]);

  //condition Rendering
  return !loading ? (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#1a1a1a] text-white scroll-smooth">
      <Header />
      <main className="flex-grow m-0 p-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}
export default App

/*
Promise matlb, tum kuch request kro, agar succesful hota h, to fir 
.then se btao aage kya Krna h
.catch se btao what if the request fails then kya Karna hai
.finally hamesha run hota hai
*/

/*
pehli baat user logged in hai agar tabhi use dikhega 

state- loading
kyuki jab aap appwrite se data fetch karenge toh thoda time lag skta network request mei..loading time
so make a loading state --> you can do conditional rendering through it
*/

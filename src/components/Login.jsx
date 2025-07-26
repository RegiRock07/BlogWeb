import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'  
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()    //React-Hook-Form
    const [error, setError] = useState("")

    /*(data) is an object with values from the form inputs. It comes from react-hook-form when the user submits the form.
    You're using it to call the Appwrite login API.

    handleSubmit(login) internally calls login(data)

    So, data looks like this:
    email: "user@example.com",
    password: "somePassword123"
    */

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4 py-12'>  {/* matte background */}
        <div className="w-full max-w-md p-8 bg-[#1e1e1e] backdrop-blur-md border border-white/10 rounded-xl shadow-lg"> {/* subtle card bg */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white">Login</h2>
            </div>

            {error && (
                <p className="text-red-400 text-sm mb-4 text-center bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit(login)} className="space-y-6">
                <div className="relative">
                    <Input
                        placeholder="Email"
                        type="email"
                        className="w-full pl-10 pr-4 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    <span className="absolute left-4 top-3 text-gray-400">
                        <i className="fas fa-user"></i>
                    </span>
                </div>

                <div className="relative">
                    <Input
                        placeholder="Password"
                        type="password"
                        className="w-full pl-10 pr-4 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <span className="absolute left-4 top-3 text-gray-400">
                        <i className="fas fa-lock"></i>
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm text-white/80">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox accent-white bg-white/10" />
                        <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="hover:underline hover:text-white">Forgot Password?</Link>
                </div>

                <Button
                    type="submit"
                    className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                    Log in
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/80">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-semibold text-white hover:underline">
                    Register
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login

//React Hook Form
/*
📌 What is register()?
register() is the function used to connect your input fields to the form. 
It tracks the value, validations, and events for that input.

State manage krne ki zaroorat nahi hai... register value uthayega input ki...aur handleSubmit hote time vo saari values lelega.

Points to Remember

const {register,  handleSubmit} = useForm()

1. Iss baar function name login banaya hai... handleSubmit nahi...
handleSubmit ek event ban chuka hai ab React_Hook_Form mei.

onSubmit={handleSubmit(login) ---> login is the function

2. <Input>
Always Spread register---> {...register("email" , {<options>} ) }

options---> required, validate

*/

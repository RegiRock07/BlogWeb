import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Input } from './index'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const user = await authService.createAccount(data)
            if (user) {
                const session = await authService.login(data)
                if (session) {
                    const userData = await authService.getCurrentUser()
                    if (userData) dispatch(authLogin({ userData }))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4 py-12'>
            <div className="w-full max-w-md p-8 bg-[#1e1e1e] backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                </div>

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <div className="relative">
                        <Input
                            placeholder="Name"
                            type="text"
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <span className="absolute left-4 top-3 text-gray-400">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>

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
                            <i className="fas fa-envelope"></i>
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

                    <Button
                        type="submit"
                        className="w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
                    >
                        Sign up
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-white/80">
                    Already have an account? {" "}
                    <Link to="/login" className="font-semibold text-white hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup

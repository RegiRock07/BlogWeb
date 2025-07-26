import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .catch((error) => console.error("Logout failed:", error))
    }

    return (
        <button
            onClick={logoutHandler}
            className="px-6 py-2 rounded-full text-white font-medium border border-white/10 bg-neutral-800 hover:bg-neutral-700 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
            Logout
        </button>
    )
}

export default LogoutBtn

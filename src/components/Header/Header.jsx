import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//store mei jaakar dekhna hai ki user Logged in hai ki nahi ---> so useSelector
function Header() {
    const authStatus = useSelector((state) => state.auth.status)   //login status
    const navigate = useNavigate()      //in these navigation bar, we make an array and loop over it

    //slug: The URL path to navigate to
    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },   //'Login' is only shown when authStatus === false
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus }, //'All Posts' is only shown when authStatus === true
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ]
    
    return (
     <header className='py-3 sticky top-0 z-50 shadow-lg bg-[#262626] border-b border-[#3f3f46] backdrop-blur-md'>
            <Container>
                <nav className='flex items-center'>
                    <div className='mr-4 group'>
                        <Link to='/' className='block transition-transform duration-300 hover:scale-105'>
                            <Logo width='70px' className='transition-opacity duration-300 group-hover:opacity-80' />
                        </Link>
                    </div>
                    <ul className='flex items-center ml-auto space-x-1'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)} //url pass krdo
                                        className={`
                                            relative px-4 py-2 rounded-lg text-sm font-medium 
                                            transition-all duration-300 ease-out
                                            transform hover:scale-105 active:scale-95
                                            ${item.name === 'Home'
                                                ? `bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                                                shadow-lg hover:shadow-xl hover:shadow-indigo-500/25
                                                hover:from-indigo-400 hover:to-purple-500
                                                before:absolute before:inset-0 before:rounded-lg 
                                                before:bg-gradient-to-r before:from-indigo-300 before:to-purple-400 
                                                before:opacity-0 before:transition-opacity before:duration-300
                                                hover:before:opacity-20`
                                                : `text-gray-300 hover:text-white 
                                                hover:bg-[#2a2a2a]
                                                hover:shadow-lg hover:shadow-black/40
                                                border border-transparent hover:border-gray-700
                                                relative overflow-hidden
                                                before:absolute before:inset-0 before:bg-gradient-to-r 
                                                before:from-transparent before:via-white/5 before:to-transparent
                                                before:translate-x-[-100%] before:transition-transform before:duration-500
                                                hover:before:translate-x-[100%]`
                                            }
                                        `}
                                    >
                                        <span className='relative z-10'>{item.name}</span>
                                        {item.name !== 'Home' && (
                                            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg' />
                                        )}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (      //if first is true tabhi dusra chalega
                            <li className='ml-2'>
                                <div className='relative group'>
                                    <LogoutBtn className='transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25' />
                                    {/* Optional: Add a subtle glow effect around logout button */}
                                    <div className='absolute inset-0 bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10' />
                                </div>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )

}

export default Header

/* useNavigate()
Instead of writing 5 separate <Link> tags manually, you define all routes in one array
Then you map() through the array to dynamically render links
This makes it scalable, clean, and maintainable
*/

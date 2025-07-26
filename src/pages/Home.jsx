import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import {Container, PostCard} from '../components';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // First check if user is logged in
                const user = await authService.getCurrentUser();
                
                if (user) {
                    setIsLoggedIn(true);
                    // User is logged in, fetch all posts
                    const posts = await appwriteService.getPosts([]);
                    if (posts) {
                        setPosts(posts.documents);
                    }
                } else {
                    setIsLoggedIn(false);
                    // User not logged in, fetch limited public posts or featured posts
                    const publicPosts = await appwriteService.getPosts([]);
                    if (publicPosts) {
                        // Show only first 3 posts as preview
                        setPosts(publicPosts.documents.slice(0, 3));
                    }
                }
            } catch (error) {
                console.log("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [])

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <div className="animate-pulse">
                                <h1 className="text-2xl font-bold text-neutral-400">
                                    Loading...
                                </h1>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Hero section for non-logged users
    if (!isLoggedIn) {
        return (
            <div className="w-full">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white py-20 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/30 to-neutral-800/20"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-700/15 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                    
                    <Container>
                        <div className="text-center relative z-10">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent animate-fade-in-up leading-normal">
                                Welcome to Our Blog
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-neutral-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
                                Discover amazing stories, insights, and ideas from our community
                            </p>
                            <div className="space-x-4 animate-fade-in-up delay-400">
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className="group bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-neutral-500/20"
                                >
                                    <span className="group-hover:text-neutral-800 transition-colors">Get Started</span>
                                </button>
                            </div>
                        </div>
                    </Container>
                </div>

                {/* Featured Posts Preview - COMMENTED FOR FUTURE USE */}
                {/*
                {posts.length > 0 && (
                    <div className="w-full py-20 bg-gradient-to-b from-neutral-900 to-black">
                        <Container>
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
                                    Featured Posts
                                </h2>
                                <p className="text-neutral-400 text-lg animate-fade-in-up delay-200">
                                    Get a taste of what our community is sharing
                                </p>
                            </div>
                            <div className="flex flex-wrap">
                                {posts.map((post, index) => (
                                    <div key={post.$id} className="p-3 w-full md:w-1/2 lg:w-1/3">
                                        <div className="relative group">
                                            <div className="transform transition-all duration-500 group-hover:scale-105">
                                                <PostCard {...post} />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg backdrop-blur-sm">
                                                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <div className="bg-neutral-900/80 backdrop-blur-md rounded-lg p-6 border border-neutral-600">
                                                        <p className="mb-4 text-lg font-medium">Login to read full post</p>
                                                        <button 
                                                            onClick={() => navigate('/login')}
                                                            className="bg-gradient-to-r from-neutral-700 to-neutral-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-neutral-600 hover:to-neutral-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-neutral-700/25"
                                                        >
                                                            Login Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-12">
                                <p className="text-neutral-400 mb-6 text-lg">
                                    Want to read more? Join our community!
                                </p>
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className="group bg-gradient-to-r from-neutral-800 to-neutral-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-neutral-700 hover:to-neutral-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-neutral-700/25"
                                >
                                    <span className="group-hover:text-neutral-100 transition-colors">Sign Up Now</span>
                                </button>
                            </div>
                        </Container>
                    </div>
                )}
                */}

                {/* Features Section */}
                <div className="bg-gradient-to-b from-neutral-800 to-black py-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-neutral-800/50"></div>
                    <Container>
                        <div className="text-center mb-16 relative z-10">
                            <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
                                Why Join Our Community?
                            </h2>
                            <p className="text-neutral-400 text-lg max-w-2xl mx-auto animate-fade-in-up delay-200">
                                Discover what makes our blog community special and start your journey today
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div className="group text-center bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 hover:border-neutral-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-neutral-700/20">
                                <div className="bg-gradient-to-br from-neutral-600 to-neutral-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-neutral-600/25">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neutral-300 transition-colors">Quality Content</h3>
                                <p className="text-neutral-400 leading-relaxed">Curated articles and insights from industry experts and passionate writers</p>
                            </div>
                            
                            <div className="group text-center bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 hover:border-neutral-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-neutral-700/20">
                                <div className="bg-gradient-to-br from-neutral-700 to-neutral-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-neutral-700/25">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neutral-300 transition-colors">Community</h3>
                                <p className="text-neutral-400 leading-relaxed">Connect with like-minded readers and writers from around the world</p>
                            </div>
                            
                            <div className="group text-center bg-gradient-to-br from-neutral-900/80 to-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 hover:border-neutral-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-neutral-700/20">
                                <div className="bg-gradient-to-br from-neutral-600 to-neutral-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-neutral-600/25">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-neutral-300 transition-colors">Fresh Updates</h3>
                                <p className="text-neutral-400 leading-relaxed">New content published regularly to keep you engaged and inspired</p>
                            </div>
                        </div>
                        
                        {/* Call to action in features section */}
                        <div className="text-center mt-16 relative z-10">
                            <button 
                                onClick={() => navigate('/signup')}
                                className="group bg-gradient-to-r from-neutral-800 to-neutral-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-neutral-700 hover:to-neutral-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-neutral-700/25"
                            >
                                <span className="group-hover:text-neutral-100 transition-colors">Join Our Community Today</span>
                            </button>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    // Logged in user view - show all posts
    return (
        <div className="w-full py-12 bg-gradient-to-b from-neutral-900 to-black min-h-screen">
            <Container>
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                        Latest Posts
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Discover the latest stories from our community
                    </p>
                </div>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-3 w-full md:w-1/2 lg:w-1/3">
                            <div className="transform transition-all duration-300 hover:scale-105">
                                <PostCard {...post} />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
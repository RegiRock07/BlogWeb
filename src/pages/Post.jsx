import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false; // Check if the current user is the author of the post

    useEffect(() => { // Fetch post by slug
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {// Function to delete the post
        if (!isAuthor) return; // Only allow deletion if the user is the author
        appwriteService.deletePost(post.$id).then((status) => { // Delete post from Appwrite service returns true or false
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    // Render the post details if the post is loaded
    return post ? (
        <div className="py-8 bg-gradient-to-b from-neutral-900 to-black min-h-screen">
            <Container>
                <div className="w-full mb-8 relative">
                    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 shadow-xl">
                        <div className="flex justify-center mb-6">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title || "Post Image"}
                                className="rounded-xl w-full max-w-[600px] max-h-[300px] object-cover border border-neutral-700 shadow-lg"
                            />
                        </div>

                        {isAuthor && ( // Show edit and delete buttons only if the user is the author
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors duration-200 border border-neutral-600">
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-red-400 hover:text-red-300 rounded-lg transition-colors duration-200 border border-neutral-600"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full mb-8">
                    <h1 className="text-4xl font-bold text-white text-center">{post.title}</h1>
                </div>
                {/* Render rich HTML content */}
                <div className="browser-css bg-neutral-900/80 rounded-xl p-8 border border-neutral-700 text-neutral-200 leading-relaxed text-lg">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
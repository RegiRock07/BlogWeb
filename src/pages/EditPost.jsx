import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null);
    const {slug} = useParams(); //to get post ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post);   // Store the post in local state
                }
            });
        } else {
            navigate('/');  // If no slug, redirect to home
        }
    }, [slug, navigate]);
    

    return post ? (
        <div className='py-8' >
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null; // Render nothing if post is not loaded yet
}
export default EditPost;





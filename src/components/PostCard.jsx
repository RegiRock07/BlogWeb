import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {  //ye $id appwrite ka khela hai
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-4 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'>
            <div className='w-full justify-center mb-4'>
                {/* Debug info */}
                {console.log('PostCard Debug:', { $id, title, featuredImage })}
                
                {featuredImage ? (
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className='rounded-xl w-full h-48 object-cover' 
                        onError={(e) => {
                            console.log('Image failed to load:', featuredImage);
                            console.log('Image URL was:', e.target.src);
                        }}
                        onLoad={() => console.log('Image loaded successfully:', featuredImage)}
                    />
                ) : (
                    <div className='rounded-xl w-full h-48 bg-red-700 flex items-center justify-center'>
                        <span className='text-white'>No Featured Image Found</span>
                    </div>
                )}
            </div>
            <h2
            className='text-2xl font-bold text-white hover:text-neutral-300 transition-colors'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard

//getFilePreview tumhe ek URL hi de raha hai image ka
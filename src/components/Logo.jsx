import React from 'react'
import logoImg from '../assets/LogoImage.webp'

function Logo({width = '100px'}) {
    return (
        <img 
            src={logoImg} 
            alt="MegaBlog" 
            style={{ width }}
            className="object-contain"
        />
    )
}
export default Logo

import React from 'react'
import './Container.css'

function Container({children}) {
    return <div className='full-width-container'>{children}</div>;
}
export default Container;

//Without Container, you'd have to repeat layout/padding styles on every page manually.
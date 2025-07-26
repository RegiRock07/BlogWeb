import React from "react";

//this is a UI design for our Buttons --> one common Template

function Button({
    children,     //jo bhi Button par likha hoga
    type = "button",
    bgColor = "bg-white",
    textColor = "text-black",
    className = "",
    ...props     //Spread any other props like onClick, disabled etc.
}) {
    return (
        <button 
            type={type}
            className={`px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 hover:brightness-90 ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
        {children}
        </button>
    );
}

export default Button;
import { useId } from "react"
import React from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref){
    const id = useId()
    return (
       <div className='w-full'>
        {label && (
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-300">
                {label}
            </label>
        )}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg
            bg-zinc-900 text-white
            border border-zinc-700
            outline-none w-full
            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            hover:border-purple-400
            transition-all duration-200 ease-in-out
            ${className}`}
        >
        {options?.map((option) => (
                <option key={option} value={option} className="bg-zinc-900 text-white">
                    {option}
                </option>
            ))}
        </select>
       </div>
    )
}
export default React.forwardRef(Select)

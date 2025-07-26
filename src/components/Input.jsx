/*forwardRef hook
Component kahi par banaya tumne... (input field)
use use tumne login form mei kia hai multiple times
ab yaha par bhi uski state ka access toh chahiye hoga toh state ka access milne ke liye koi toh reference chahiye hoga ---> forwardRef

When you create a custom component like <Input />, it’s not a regular HTML tag (like <input />). 
So, if you want to access its internal state or DOM node (like .value, .focus(), etc.) from the parent, 
you need a special connection — and that’s done using ref.

But React doesn't pass refs to custom components by default. 
To allow that, you wrap your custom component in forwardRef.
*/
import React, {useId} from 'react'
//input field bana rahe hai ek common si... username, password etc etc ki entries fill krne ke liye.

const Input = React.forwardRef( function Input({    //React.forwardRef se wrap up kardia.. now you have created a reference 
    label,
    type = "text",
    className = "",
    ...props           //Spread any other props like onClick, disabled etc
}, ref){  //reference

    const id = useId() // we are giving unique id to each input box that will be used
    return (
        <div className='w-full'>
            {label && <label                     //if label is passed then..
            className='inline-block mb-1 pl-1' 
            htmlFor={id}> 
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/20 outline-none hover:border-white/30 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-200 shadow-sm hover:shadow-md w-full ${className}`}

            ref={ref} //yaha se reference milega parent component ka fir state ka access milega
            {...props}
            id={id}
            />
        </div>
    )
})
export default Input
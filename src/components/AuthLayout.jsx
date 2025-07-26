import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication= true}) {

    const navigate =useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)  //LoggedIn Status

   useEffect(() => {
        const shouldRedirectToLogin = authentication && !authStatus;
        const shouldRedirectToHome = !authentication && authStatus;

        if (shouldRedirectToLogin) {
            navigate("/login");
        } else if (shouldRedirectToHome) {
            navigate("/");
        }

        setLoader(false)
    }, [authStatus, navigate, authentication]) //dependencies

    return loader ? <h1>Loading...</h1> : <>{children}</>     //Conditional Rendering
}
export default Protected;

//This is a Mechanism to protect Pages/Routes.

// We make a protected Container. Conditionally render krenge ki kya uske children ko render karna hai ya nahi.

/*
✅ const shouldRedirectToLogin = authentication && !authStatus;
If the route requires login (authentication === true)

And the user is not logged in (authStatus === false)

👉 Redirect them to /login.


✅ const shouldRedirectToHome = !authentication && authStatus;
If the route is for unauthenticated users like login/signup (authentication === false)

But the user is already logged in (authStatus === true)

👉 Redirect them to /.


These two lines handle:
🔒 Protected pages (like Dashboard)
🚫 Restricted pages (like Login)
*/


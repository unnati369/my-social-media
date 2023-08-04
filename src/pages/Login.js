import { useContext } from "react"
import { PostContext } from "../context/PostContext"
import { useLocation, useNavigate} from "react-router"

export const Login = () =>{
    const {isLoggedIn,setIsLoggedIn} = useContext(PostContext)
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = () => {
      setIsLoggedIn(!isLoggedIn);
      navigate(location?.state?.from?.pathname);
    };
    return(
        <>
            <h1>Please login to continue.</h1>
           {isLoggedIn &&<div> <p>Username : <input /></p>
            <p>Password : <input /></p></div>}
            <button onClick={()=>handleLogin()}>{isLoggedIn ? "Logout" : "Login"}</button>
        </>
    )
}
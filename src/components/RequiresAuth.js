import { useContext } from "react"
import { PostContext } from "../context/PostContext"
// import { useLocation } from "react-router-dom"
import { Navigate, useLocation } from "react-router";

export const RequiresAuth = ({children})=>{
    const {isLoggedIn, setIsLoggedIn} = useContext(PostContext)
    let location = useLocation()
    return(
        <>
            {
                isLoggedIn ? children : <Navigate to="/login" state={{from : location}}/>
            }
        </>
    )
}
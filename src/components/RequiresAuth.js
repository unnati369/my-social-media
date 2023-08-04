import { useContext } from "react"
import { PostContext } from "../context/PostContext"
// import { useLocation } from "react-router-dom"
import { Navigate, useLocation } from "react-router";

export const RequiresAuth = ({children})=>{

    let location = useLocation();
    const { state } = useContext(PostContext);
    return state.signedIn ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );



}
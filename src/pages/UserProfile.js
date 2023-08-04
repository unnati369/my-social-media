import { useContext } from "react"
import { PostContext } from "../context/PostContext"
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useLocation, useNavigate} from "react-router"

export const UserProfile = () =>{

    const {state, dispatch} = useContext(PostContext)
    
 function AddBio() {
	return (
		<div>
			{/* <h4>Add Bio</h4> */}
			<Popup trigger=
				{<button > Add Bio </button>}
				position="right center">
				<input onChange={(e)=> {
                    // console.log(e.target.value)
                    dispatch({type: "inputBio", payload : e.target.value})}}/>
				<button className="bttn" onClick={()=> dispatch({type: "addBio"})}>Update Bio</button>
			</Popup>
		</div>
	)
};
function AddUrl(){
    return(
        <div>
            <Popup trigger={<button>Add Url</button>}
            position="right center">
<input onChange={(e)=>dispatch({type: "inputUrl", payload: e.target.value})} />
<button className="bttn" onClick={()=> dispatch({type:"updatePortfolioUrl"})}>Update Url</button>
            </Popup>
            
        </div>
    )
}
const {isLoggedIn,setIsLoggedIn} = useContext(PostContext)
const navigate = useNavigate();
const location = useLocation();
const handleLogin = () => {
  setIsLoggedIn(!isLoggedIn);
  navigate(location?.state?.from?.pathname);
};
    return(
        <>
            <div className="userPage">
                <img src={state.avatar} alt="Avatar" height="180px" className="avataar"/>
                <button className="buttn" onClick={()=> dispatch({type: "getAvatar"})}>Change Avatar</button>
            <h3>{`Bio : ${state.bio}`}</h3>
               
                {AddBio()} 
             <p>{`Portfolio url : ${state.url}`}</p>
                {AddUrl()}
                <button className="buttn" onClick={()=>handleLogin()}>{isLoggedIn ? "Logout" : "Login"}</button></div>
            
            
        </>
    )
}
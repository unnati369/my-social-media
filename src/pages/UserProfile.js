import { useContext } from "react"
import { PostContext } from "../context/PostContext"
import React from 'react';
import Popup from 'reactjs-popup';
import { NavLink } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import { useLocation, useNavigate} from "react-router"
import { Login } from "./Login";
export const UserProfile = () =>{

    const {state, dispatch, loading, loader} = useContext(PostContext)
    
 function AddBio() {
	return (
		<div>
		
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
// loader()
    return(
      <>
        {loading ? 
          (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          ) : (<>
            <div className="userPage">
                <img src={state.avatar} alt="Avatar" height="180px" className="avataar"/>
                <button className="buttn" onClick={()=> dispatch({type: "getAvatar"})}>Change Avatar</button>
            <h3>{`Bio : ${state.bio}`}</h3>
               
                {AddBio()} 
             <p>{`Portfolio url : ${state.url}`}</p>
                {AddUrl()}
                {state.signedIn ? (
            <NavLink to="/">
              <button onClick={() => dispatch({ type: "signOut" })}>
                Sign Out
              </button>
            </NavLink>
          ) : (
            <Login />
          )}</div>
            
            
        </>)}</>
    )
}
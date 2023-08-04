import { NavLink } from "react-router-dom"
import React, { useContext , useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { PostContext } from "..";
// import {Navigate} from "react-router"
import { useNavigate } from "react-router-dom";
// import CircleType from 'circletype';
import "./styles.css";


export const Header = () =>{
    const navigate = useNavigate();
    const {state, dispatch, bgColor , setbgColor} = useContext(PostContext)
  
   
    function searchBar(){
        return(
            <div>
                <Popup trigger={ <img src="https://cdn-icons-png.flaticon.com/512/3435/3435443.png" height="50px" className="icons"/>
               
     }>
      <input placeholder="Search users" onChange={(e)=>dispatch({type:"searchUsers",payload : e.target.value})}  position="right center"/>
              <p> {
        state.searchedUsers === [] ? "No users found" : "Users : "
    }</p>
             <div>{  
        state?.searchedUsers?.map(user => <div className="searched">
        <img src="http://bit.ly/42Zm7tM"  alt="profilePic"
                      height="20px"
                    />
            <p onClick={()=>navigate(`/userprofile/${user.id}`)}>{user.firstname}{" "}{user.lastname}</p>
        </div> )
    }</div>
   
  
    
                </Popup>
                
            </div>
        )
    }

    return(
        <div className="navItems">
              <NavLink to="/"><div>
              <img src="https://cdn-icons-png.flaticon.com/512/7631/7631040.png" height="65px" />
    </div></NavLink>
      <p id="title">SERENdEpity</p>
 
        
    {searchBar()}
    <NavLink to="/usersPosts"><img src="https://cdn-icons-png.flaticon.com/512/668/668290.png" height="50px"  className="icons"/></NavLink>
    <NavLink to="/bookmarks" > <img className="icons" src="https://cdn-icons-png.flaticon.com/512/148/148883.png" alt="bookmarks" height="50px"/> </NavLink> 
    <NavLink to="/likedposts" ><img className="icons" src="https://cdn.pixabay.com/photo/2021/03/22/09/34/heart-6114039_1280.png" height="50px" alt="likedPosts"/> </NavLink> 
<NavLink to="/userprofile"><img src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png" height="50px"  /></NavLink>
<img src="https://cdn-icons-png.flaticon.com/512/180/180700.png" height="50px" className="icons" onClick={()=>{ setbgColor(bgColor === "light" ? "dark" : "light")
document.body.className = bgColor
console.log(bgColor)}  
  
} />

<img
          onClick={() => dispatch({ type: "signOut" })}
          src="https://www.freeiconspng.com/thumbs/sign-out-icon/sign-out-logout-icon-0.png"
          alt="logout"
          height="54px"
          style={{ marginLeft: "15px" }}
        />{" "}
         
        </div>
    )
}
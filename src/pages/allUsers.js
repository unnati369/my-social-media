import { useContext } from "react"
import { PostContext } from "../context/PostContext"
import {Users} from "../components/Users"

export const SuggestedUsers = () =>{
  const {state,dispatch} = useContext(PostContext)
// console.log(state.users)
  return (<>
  {
     state.users?.map(user =>
     <div className="user">
     <li>{`${user.firstname} ${user.lastname }`}</li>
    <button className="followBtn" onClick={()=> dispatch({type:"addFollower", payload:user}) } style={{color: user.follow ?"#475569": "blue" }}>{user.follow ? "Unfollow" : "Follow"}</button>
   
     </div>
   
     )
 }
   </>
       )
    
  
  
}
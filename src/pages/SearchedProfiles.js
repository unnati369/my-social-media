import { useContext } from "react"
import { useParams } from "react-router-dom"
import { PostContext } from "../context/PostContext"
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const SearchedProfiles = () =>{
    const {userId} = useParams()
    const {state, dispatch, postListing} = useContext(PostContext)
    function AddComment(post){
        return(
            <div>
                <Popup trigger={<i class="fa-solid fa-comment" >{post.comments}</i>}
                position="right center">
    <input  />
    <button onClick={()=> dispatch({type:"addComment", post: post})}>Add Comment</button>
    
                </Popup>
                
            </div>
        )
    }
    const userItem = state.users?.find(user => user.id === Number(userId))
    // console.log(userId)
    // console.log(state.users?.find(user => user.id === Number(userId)))
    return(
        <div className='vertical'>
            {
<div className="searchedProfile">
    <li><img src="http://bit.ly/42Zm7tM"  alt="profilePic"
                      height="60px"
                    /></li>
                    <li><h2>{userItem.firstname}{" "}{userItem.lastname}</h2></li>
                    <li><p>{`@${userItem.username}`}</p></li>
                    <button className="followBtn" onClick={()=> {dispatch({type:"addFollower", payload:userItem, isFollowing : userItem.follow})
                    // console.log(userItem.follow)
                    } } style={{color: userItem.follow ?"#475569": "blue" }}>{userItem.follow ? "Unfollow" : "Follow"}</button>
                    <div className="prp">
                        <b className="profilefollow"><li className="text">Following : {userItem.following}</li>
                        <li className="text"> Followers : {userItem.followers}</li></b>

                    </div>
                    {
                postListing.filter(post => post.lastname === userItem.lastname).map(post =><div  key={post.id} className='postlist' >
              
                <li className='listItem'><b>Content : </b>{post.content}</li>
        <li className='listItem'><img src={post.image} alt={post.upload_date} height ="40%"/></li>
        <li>Likes : {post.likes}</li>
        <li>{post.likes > 80 ? "Trending" : "" }</li>
        <li>Posted : {post.upload_date}</li>
        {/*
        <i class="fa-solid fa-heart" style={{color: state.likedPostsPage?.find(item => item === post) ? "red" : "green"}} onClick={()=> dispatch({type : "addLikes", payload: post })}></i>
        {AddComment(post)}
       
        <i class="fa-solid fa-bookmark" onClick={()=> dispatch({type: "bookmark", payload: post})} ></i> */}
        <div className='iconss' >
        <i class="fa-solid fa-heart" style={{color: state.likedPostsPage?.find(item => item.id === post.id) ? "red" : ""}} onClick={()=> dispatch({type : "addLikes", payload: post })}></i>
        {AddComment(post)}
       
        <i class="fa-solid fa-bookmark" style={{color:state.bookmarkedPost?.find(item => item.id === post.id )? "blue" : "lightgrey"  }} onClick={()=> dispatch({type: "bookmark", payload: post})} ></i>
</div>
        <hr/>
                </div>)
            }
</div>
            }
         
        </div>
    )
}
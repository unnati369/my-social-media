import { useContext } from "react";
import { PostContext } from "..";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export const LikedPosts = () =>{
    const {state, dispatch} = useContext(PostContext)
    function AddComment(post){
        return(
            <div>
                <Popup trigger={<i class="fa-solid fa-comment" >{post?.comments}</i>}
                position="right center">
    <input  />
    <button onClick={()=> dispatch({type:"addComment", post: post})}>Add Comment</button>
    
                </Popup>
                
            </div>
        )
    }
   
    return(
        <>
        <h1>{state.likedPostsPage.length === 0 ? "No liked posts" : "Liked Posts"}</h1>
            {
                state.likedPostsPage.map(post => <ul className='postlist'>
           <div style={{display:"flex", justifyContent:"center"}}>
           
            <li  className='listItem'><b>Name : {post.firstname}{" "}{post.lastname}</b></li></div>
        <li className='listItem'><b>Content : </b>{post.content}</li>
        <li className='listItem'><img src={post.image} alt={post.upload_date} height ="40%"/></li>
        
        <li>Likes : {post.likes}</li>
        <li>{post.likes > 80 ? "Trending" : "" }</li>
        <li>Posted : {post.upload_date}</li>
        <div className='iconss'>
        <i class="fa-solid fa-heart" style={{color: state.likedPostsPage?.find(item => item.id === post.id) ? "red" : ""}} onClick={()=> dispatch({type : "addLikes", payload: post })}></i>
        {AddComment(post)}
       
        <i class="fa-solid fa-bookmark" style={{color:state.bookmarkedPost?.find(item => item.id === post.id )? "blue" : "lightgrey"  }} onClick={()=> dispatch({type: "bookmark", payload: post})} ></i>
</div>
        <hr/></ul>)
            }
        </>
    )
}
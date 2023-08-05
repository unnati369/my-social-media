import { useContext, useState } from "react";
import { PostContext } from "..";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';





export const PostsList = ()=>{

const {postListing, dispatch, state, updatedPost,loader,loading, setAllPosts} = useContext(PostContext)
// console.log(postListing)

const editPopUp = (post)=> {
    return (
        <div className='editPop'>
            <h4>Edit Post</h4>
            <input onChange={(e)=>dispatch({type:"getContentToEdit",payload : e.target.value})}/>
          
            <button className='followBtn' onClick={()=> dispatch({type:"discard"})}>Close</button>
        </div>
    )
};
// const addPost = (e)=>{
// return (e)
// }
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
function postPopUp(post){
    return(
        <div>
            <Popup trigger={<i class="fa-solid fa-ellipsis"></i>}>
          {postListing.map(item => item.id === post.id ? <select value={post} onChange={(e)=>{
 
 dispatch({type: "changePost", payload: e.target.value, post: post})

 }}>
 <option>Select an option :</option>
 <option value="delete" 
     >Delete</option>
   
 <option value="edit" >Edit</option>

</select> : "" ) }
            </Popup>
        </div>
    )
}
// loader()
    return(
        <>
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
             <div className='home'>
        <div className='vertical'>
       
       
{
    postListing?.map(post => <ul className='postlist'>
           <div >
            <>
        
            {post.username === "You" && postPopUp(post)}
             
                { state.editPopUp.id === post.id &&  editPopUp(post)}
            </>
               
            
             
             <div style={{display:"flex", justifyContent:"center"}}>
             <li  className='listItem'><b>Name : {post.firstname}{" "}{post.lastname}</b></li></div>
        <li className='listItem'><b>Content : </b>{post.content}</li>
        <li className='listItem'><img src={post.image} alt={post.upload_date} height ="40%"/></li>
        <li>Likes : {post.likes}</li>
        <li>{post.likes > 80 ? "Trending" : "" }</li>
        <li>Posted : {post.upload_date}</li>
        <div className='icons'>
        <i class="fa-solid fa-heart" style={{color: state.likedPostsPage?.find(item => item.id === post.id) ? "red" : ""}} onClick={()=> dispatch({type : "addLikes", payload: post })}></i>
        {AddComment(post)}
       
        <i class="fa-solid fa-bookmark" style={{color:state.bookmarkedPost?.find(item => item.id === post.id )? "blue" : "lightgrey"  }} onClick={()=> dispatch({type: "bookmark", payload: post})} ></i>
</div>
        <hr/>
       </div>
    </ul>)
 
}

     
       </div>
        </div>)}</>
    )
}

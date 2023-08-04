import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { PostContext } from '../context/PostContext';
import { SuggestedUsers } from "./allUsers";
export const Home = () =>{
    const {state, dispatch, setAllPosts,updatedPost, homePosts} = useContext(PostContext)
    
    function createPost (){
        return(
            <div >
                <Popup trigger={ <button className='input'>What's on your mind </button>}
                position="right center"     >
                <div className='popUp'>
                <input placeholder="Write your thoughts here." onChange={(e)=> dispatch({type:"newContent", payload:e.target.value})} className='input' />
    <button onClick={()=>{ 
                setAllPosts(updatedPost)
                dispatch({type: "addPost"})}} className='btn'>Create Post</button>
                </div>
  
                </Popup>
            </div>
        )
    }
    const editPopUp = (post)=> {
        return (
            <div className='editPop'>
                <h4>Edit Post</h4>
                <input onChange={(e)=>dispatch({type:"getContentToEdit",payload : e.target.value})}/>
              
                <button className='followBtn' onClick={()=> dispatch({type:"discard"})}>Close</button>
            </div>
        )
    };
   
    function AddComment(post){
        return(
            <div>
                <Popup trigger={<i class="fa-solid fa-comment" >{post.comments}</i>}
               position="left top">
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
              { homePosts.map(item => item.id === post.id ? <select value={post} onChange={(e)=>{
     
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
    return(
        <div className='home'>
            <div className='vertical'>
            <div className="newBlock">
        {createPost()}
       
        </div>
        <div>
            
        <button onClick={()=>dispatch({type: "sortByDate"})} className='bttn'>Latest</button>
        <button onClick={()=>dispatch({type: "sortByTrending"})} className='bttn'>Trending</button>
        </div>
        
        <div>
        {
           homePosts?.map(post =><ul className='postlist'>
           <div style={{display:"flex", justifyContent:"center"}}>
            <>
        
            {post.username === "You" && postPopUp(post)}
             
                { state.editPopUp.id === post.id &&  editPopUp(post)}
            </>
            <li style={{marginLeft:"5%"}} className='listItem'><b>Name : {post.firstname}{" "}{post.lastname}</b></li></div>
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
        <hr/></ul>
            
           ) 
        }
        </div>
        </div>
        <div className='suggestedUsers'>
        <h3>Suggested Users</h3>
        <div>
<SuggestedUsers/>
</div>
</div>
</div>
    )
}
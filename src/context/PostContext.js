import {createContext, useEffect, useReducer, useState } from "react"
import {v4 as uuid} from "uuid"
import {Users} from "../components/Users"
import { useLocation, useNavigate } from "react-router";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const PostContext = createContext()

export const PostContextProvider = ({children})=>{
   
let [allPosts, setAllPosts] = useState([])
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const location = useLocation();

const loader = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 70);
};
const fetchPosts = () =>{
    fetch('/api/posts')
    .then(res=> res.json())
    .then(json => setAllPosts(json.posts))
    .catch(error=> console.error(error))
}
const [ bgColor , setbgColor] = useState("light")
useEffect(()=>{
    fetchPosts()
    loader()
   
     }


,[])
const PostsReducer = (state, action) =>{
    switch(action.type){
case "sortByTrending" : {
    return {...state, sortTrending : true, sortLatest : false}
}
case "sortByDate" : {
    return {...state, sortLatest : true, sortedTrending: false }
}
case "addPost" : {
    toast("Post Added")
   return {...state, data: [  {
        id: uuid(),
        firstname: "Unnati",
      lastname: "Makrariya",
        content: state.newContent,
        image: `https://picsum.photos/200/300?random=${Math.random()}`,
        likes: 0,
        username : "You",
        upload_date: 'now',
        trending: false,
        latest: true,
      }, ...allPosts]}
  
}
case "addLikes" : {
  
    return {...state,  likedPostsPage: state.likedPostsPage?.find(item => item.id === action.payload.id ) ? state.likedPostsPage?.filter(item => item.id !== action.payload.id) : [...state.likedPostsPage, action.payload]}
}
case "bookmark":{
    // console.log(state.bookmarkedPost)
    toast(state.bookmarkedPost?.find(item => item.id === action.payload.id )? "Post removed from bookmarks": "Post Bookmarked")
    return {...state, bookmarkedPost: state.bookmarkedPost?.find(item => item.id === action.payload.id )? state.bookmarkedPost?.filter(item => item.id !== action.payload.id) :[...state.bookmarkedPost, action.payload]}
}

case "changePost":{
  toast(action.payload === "delete" && "Post deleted" )
   return {...state, delete: action.payload === "delete" ? [...state.delete, action.post] : state.delete, 
  data: action.payload === "edit" ? (allPosts?.map(post => post.id == action.post.id ? ({...post, edit : true}) : ({...post, edit: false}))) : state.data
  }
    
}

case "getContentToEdit":{
    return {...state,content:action.payload}
}
case "addNewContent":{
  toast(state.content.length > 0 && "Post Content Updated")
  return {...state, data: allPosts?.map(post => post.id == action.post.id ? ({...post, edit: false, content : state.content.length > 0 ? state.content : post.content }) : post)}
}
// case "changeContent":{
//     return {...state, edit: state.add ? state.content : action.payload, editPopUp: false}
// }
case "discard" :{
    return {...state, data: allPosts?.map(post => ({...post, edit : false}))}
}
case "getAvatar" : {
  toast("Profile Avatar Updated")
    return {...state, avatar : `https://picsum.photos/200/300?random=${Math.random()}`}
}
case "inputBio":{
    return {...state, inputBio : action.payload}
}
case "addBio":{
  toast("Updated bio")
    return {...state, bio: state.inputBio }
}
case "inputUrl":{
    return {...state, inputUrl : action.payload}
}
case "updatePortfolioUrl":{
  toast("Updated portfolio url")
    return {...state, url: state.inputUrl}
}
case "newContent":{
    return {...state, newContent :action.payload}
}

case "addComment":{
    // console.log(state.commentedPost)
    toast("Comment added")
    return {...state, commentedPost: [...state.commentedPost, action.post]}
}
case "searchUsers":{
   let foundUsers = action.payload.length !== 0 && state.users?.filter(person => person.firstname.toLowerCase().includes(action.payload.toLowerCase()))
    console.log(foundUsers)
    return {...state,  searchedUsers: foundUsers ? [...foundUsers] : []
    }
}
case "changeColor":{
   
    return {...state,bgColor : !state.bgColor}
}
case "addFollower" : {
    // console.log(action.isFollowing)
    
    toast(action.isFollowing ? "Unfollowed user" : "Followed user")
    return {...state, users: state.users?.map(user => user.id === action.payload.id ? ({...user, follow : !user.follow, followers : user.follow ? user.followers-1 : user.followers+1}) : user), followed: state.followed?.find(user => user === action.payload.lastname) ? state.followed?.filter(item => item!== action.payload.lastname ) : [...state.followed, action.payload.lastname]}
}
case "signIn": {
    toast("Signed In");
    navigate(location?.state?.from?.pathname);
    return { ...state, signedIn: true };
  }
  case "signOut": {
    toast("Signed Out");
    return { ...state, signedIn: false };
  }
  case "account": {
    return { ...state, create: !action.payload ? true : false };
  }
  case "password": {
    return {
      ...state,
      passwords: action.payload
    };
  }
  case "repassword": {
    return {
      ...state,
      repassword: action.payload
    };
  }
  case "hidePassword": {
    return {
      ...state,
      hidePassword: !state.hidePassword
    };
  }
  case "confirm": {
    return {
      ...state,
      confirm:
        state.passwords.length > 0 && state.passwords === state.repassword
    };
  }

    }
}
const [state, dispatch] = useReducer(PostsReducer,{sortTrending: false, sortLatest : false, newPost: "", updatedPost: false, likedPost: "", bookmarkedPost: [], likedPostsPage: [], data: "", popUp: false, editPopUp : "", delete:[], edit:"", content: "", avatar: `https://picsum.photos/200/300?random=${Math.random()}`, bio: "No bio added.", inputBio: "", inputUrl:"", url:"No URL added.", newContent : "",  commentedPost:[], users:Users, searchedUsers: [], bgColor: true, followed:[],signedIn: false,
email: "",
password: "", create: true,
passwords: "",
repassword: null,
confirm: false,
add: false,
hidePassword: true})


const updatedPost = state.data === "" ? allPosts : state.data
const sortedTrending = state.sortTrending ? updatedPost?.filter(post =>  post.likes > 80) : updatedPost
const sortedByDate = state.sortLatest ? updatedPost?.filter(post => post.latest === true ) : sortedTrending

const likePost = sortedByDate?.map(post => state.likedPostsPage?.find(item => item.id === post.id) ? {...post , likes: post.likes+1} : post)
const toBeDeleted = likePost?.filter(post => state.delete?.find(item => item.id === post.id) ? "" : post)
const updatedContent = toBeDeleted?.map(item => item.id === state.post?.id ? {...item, content: state.content} : item)

// const updatedCommented = state.commentedPost?.map(item => ({...item,comments : item.comments+1 }))
const updateCommented =  updatedContent?.map(item => ({...item, comments: state.commentedPost?.filter(post=> post.id === item.id ).length}))

const postListing = updateCommented
let myPosts = postListing?.filter(item => item.username === "You" ? item : "")
let followedUsers = postListing?.filter(item => state.followed?.find(user => user === item.lastname) ? item : "")

  
let homePosts = [...myPosts, ...followedUsers ]
const [isLoggedIn, setIsLoggedIn] = useState(false)
    return(
        
        <>
            <PostContext.Provider value={{postListing, setAllPosts, state, dispatch, updatedPost,homePosts, isLoggedIn,setIsLoggedIn,Users,bgColor , setbgColor, loader, loading}}>
                {children}
            </PostContext.Provider>
        </>
    )
}
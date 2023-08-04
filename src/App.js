// import logo from './logo.svg';
import './App.css';

import {NavLink, Route, Routes} from "react-router-dom"
import {SearchedProfiles} from "./pages/SearchedProfiles"
import { PostsList } from './pages/PostsList';
import { Bookmarks } from './pages/Bookmarks';
import { LikedPosts } from './pages/LikedPosts';
import {Login} from "./pages/Login"
import { RequiresAuth } from './components/RequiresAuth';
import {UserProfile} from "./pages/UserProfile"
import { Home } from './pages/Home';
import { Header } from './pages/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { UserPage } from "./pages/UserPage"
function App() {

  return (
    
    <div className="App">
      
    <nav className='navBar'>
  <Header/>
{/* <NavLink to="/">Home</NavLink> */}
    </nav>
    <div className='display'>
    <div className='boxes'>
    <NavLink to="/bookmarks" className="tabs"> Bookmarks </NavLink> 
    <NavLink to="/likedposts" className="tabs"> Liked Posts </NavLink> 

    </div>
    <div >
    <Routes>
      <Route path="/usersPosts" element={<PostsList/>}/>
      <Route path="/bookmarks" element={<RequiresAuth><Bookmarks/> </RequiresAuth>} />
      <Route path="/likedposts" element={<RequiresAuth><LikedPosts/></RequiresAuth> }/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/userprofile" element={<RequiresAuth><UserProfile/></RequiresAuth>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/userprofile/:userId" element={<SearchedProfiles/>}/>
    </Routes>
    </div>
    </div>
    <ToastContainer
        // limit={1}

        position="top-right"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

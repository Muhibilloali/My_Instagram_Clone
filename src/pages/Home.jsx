import React from "react";
import Navbar from "../components/Navbar";
import Stories from "../components/Stories";
import Recommendations from "../components/Recommendations";
import Post from "../components/Post";

// import Register from "./Register"

import "../style/home.scss"


const Home = () =>{
    return( 
        
    <div className="flex-container">
        <div className="Home-navbar"><Navbar /></div>
        <div className="Face-story"><Stories /></div>
        <Post />
        <div className="Recommendations"><Recommendations/></div>
        
    </div>

  

       
    )
   
}


export default Home
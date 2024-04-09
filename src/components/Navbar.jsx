import React from 'react';
import { AiFillHome,BiImageAdd,AiFillPlusCircle,AiOutlineSearch,AiFillCompass,AiFillPlayCircle,AiFillMessage,AiFillPlusSquare } from 'react-icons/ai';
import {IoIosNotifications} from "react-icons/io"
import {FaUserAlt} from "react-icons/fa"
const Navbar = () => {
return (
    <div className="navbar">
      
        <ul>  
            <br />
                <li> <span className='navtext'><a  href="#home"><img src="https://i.ibb.co/0GGHK3x/Frame.png" alt="" /></a></span></li>
                <li><a  href="#home"><AiFillHome /> <span className='navtext'> Home</span></a></li>
                <li><a href="#news"> <AiOutlineSearch /><span className='navtext'> Search</span> </a></li>
                <li><a href="#contact"><AiFillCompass /><span className='navtext'> Interesting</span> </a></li>
                <li><a href="#about"> <AiFillPlayCircle /><span className='navtext'> Reels</span></a></li>
                <li><a href="#about"><AiFillMessage/><span className='navtext'> Massages</span> </a></li>
                <li><a href="#about"><IoIosNotifications/><span className='navtext'> Notifications</span> </a></li>
                <li><a href="#about"><AiFillPlusCircle /><span className='navtext'> Create</span> </a></li>
                <li><a href="#about"><FaUserAlt/><span className='navtext'> Profile</span> </a></li>
         </ul>
   
    </div>
 );
};
export default Navbar;
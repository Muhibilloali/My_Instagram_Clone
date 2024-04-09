import React, { useState } from "react";
//import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import useUser from "../hooks/useUser";
import { fireAuth } from "../firebase/config";
import { avatar } from "./assets";
import SvgIcons from "./SvgIcons";

import "./Components.css";

const Header = () => {
    const history = useHistory();

    const {
        user: { photo, username },
    } = useUser();

    const { pathname } = history.location;
    const logoutHandler = () => {
        fireAuth.signOut();
        history.push("/login");
    };
    const [searchTex, setSearchTex] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (searchTex !== "") {
            history.push(`/${searchTex}`);
        }
    };
    //const [isModal, setIsModal] = useState(false);
    return (
        <div className="header-body">
            {/* border-b border-gray-border  bg-white fixed w-full z-50 */}
            <div className="container mx-auto md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between py-3">
                <div>
                    <Link to="/">
                        
                        <h2 className="w-32 text-xl px-2 sm:w-auto sm:h-8">
                            Instagram
                            </h2>
                    </Link>
                </div>
                <div>
                    <form action="" onSubmit={onSubmitHandler}>
                        <input
                            value={searchTex}
                            onChange={(e) => setSearchTex(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className="py-3 px-2 p-3 h-4 text-sm w-24  sm:w-48 text-gray-base rounded-xl border border-gray-border focus:outline-none bg-gray-bg focus:bg-white"
                        />
                    </form>
                </div>
                <div className="w-48 flex items-center ml-2 mr-2 space-x-2 justify-between cursor-pointer">
                    <div>
                        <Link to="/">
                            {pathname === "/"
                                ? SvgIcons.homeFill
                                : SvgIcons.homeOutline}
                        </Link>
                    </div>
                    
                    <div>
                        <Link className="cursor-pointer" to="/chat">
                            {pathname === "/chat"
                                ? SvgIcons.messageFill
                                : SvgIcons.messageOutline}
                        </Link>
                    </div>

                    {/* Create post */}
                    {/* <div>
                        <Link className="cursor-pointer" to="/modal">
                            {pathname === "/modal"
                                ? SvgIcons.modalFill
                                : SvgIcons.modalOutline}
                        </Link>
                    </div> */}
                    
                    

                    <div>{SvgIcons.heartOutline}</div>
                    <div>
                        <FiLogOut
                            className="cursor-pointer"
                            size={22}
                            onClick={logoutHandler}
                        />
                    </div>

                    <div className="h-8 w-8 rounded-full bg-gray-base">
                        <Link to={`/${username}`}>
                            <img
                                src={photo || avatar}
                                alt="user"
                                className="h-8 w-8 rounded-full bg-gray-base"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

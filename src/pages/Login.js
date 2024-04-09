import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { fireAuth } from "../firebase/config";
import googlePlay from "./imagesPlay/googlePlay.png";
import miсoStore from  "./imagesPlay/micoStore.png";
import instagram from  "./imagesPlay/instagram.png";
import microsoft from  "./imagesPlay/microsoft.png";


import "./pages.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const isInvalid = email === "" || password === "";

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            await fireAuth.signInWithEmailAndPassword(email, password);
            setLoader(false);
            history.push("/");
        } catch (err) {
            setLoader(false);
            setPassword("");
            setEmail("");
            setError(err.message);
        }
    };
    return (
        <div className="login">
            <Helmet>
                <title>Instagram | Login</title>
            </Helmet>
            <div className="container flex justify-center mx-auto items-center h-screen max-w-screen-md ">
                <div className="w-3/5 hidden md:block">
                 
                </div>
                <div className="flex flex-col w-5/6  md:w-2/5">
               
                    <div className="login-form">
                    {/* w-[500px] h-auto  border border-gray-border rounded items-center mb-4 p-4  sm:mx-4 */}
                   
                    <img className="instagram-logo" src={instagram} alt="" />
                        
                        <form onSubmit={submitHandler}>
                            <input
                                className="input2"
                                type="text"
                                placeholder="Username"
                            />
                            <input
                                className="input1"
                                aria-label="Enter your email address"
                                value={email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                type="email"
                                placeholder="Email"
                                // className="w-full mb-5 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <input
                                className="input2"
                                value={password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                type="password"
                                placeholder="Password"
                                // className="w-full mb-5 px-4 py-4 border  border-gray-border rounded text-sm h-2 text-gray-base focus:outline-none focus:ring-2 focus:ring-blue bg-gray-bg focus:bg-white"
                            />
                            <button
                            className="login-btn bg-blue"
                                // className="w-full bg-blue text-white font-bold h-10 cursor-pointer rounded disabled:opacity-50 flex justify-center items-center"
                                type="submit"
                                disabled={isInvalid}
                            >
                                {loader ? <Spinner /> : "Log in"}
                            </button>

                            <p className="login-signup-btn">
                            
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/registration"
                                className="font-bold text-blue mt-50 ml-2 justify-center items-center"
                            >
                                Sign up
                            </Link>
                            </p>
                        </form>
                    </div>

                    <div className=" login-app">
                        <p className="text-xl justify-center items-center">Get the app</p>
                        {/* className="  text-xl justify-center items-center" */}
                        <div className="flex"> 
                            <img className="w-[205px] h-65 mt-2 cursor-pointer" src={googlePlay} alt="" />
                            <img className="app-micoStore" src={miсoStore} alt="" />
                            {/* w-[155px] h-65 mt-2 cursor-pointer */}
                            <img className="app-microsoft" src={microsoft} alt="" />
                        </div>
                    </div>
                    
                        
                    {error && (
                        <div className="flex justify-center items-center bg-white p-4 border border-gray-border rounded sm:mx-4 mt-3">
                            <p className="text-sm text-red-error">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;

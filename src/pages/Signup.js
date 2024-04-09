import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { fireAuth, fireStore } from "../firebase/config";
import { checkExistingUserName } from "../services/services";
import googlePlay from "./imagesPlay/googlePlay.png";
import miсoStore from  "./imagesPlay/micoStore.png";
import instagram from  "./imagesPlay/instagram.png";
import microsoft from  "./imagesPlay/microsoft.png";


const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const isInvalid =
        email === "" || password === "" || userName === "" || fullName === "";
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        const isNameAvailable = await checkExistingUserName(userName);

        if (isNameAvailable) {
            try {
                const createdResult =
                    await fireAuth.createUserWithEmailAndPassword(
                        email,
                        password
                    );
                await createdResult.user.updateProfile({
                    displayName: fullName,
                });
                await fireStore.collection("users").add({
                    uid: createdResult.user.uid,
                    username: userName.toLowerCase(),
                    displayName: fullName,
                    email: email.toLowerCase(),
                    following: [],
                    followers: [],
                    photo: "",
                    dateCreated: Date.now(),
                });
                setLoader(false);
                history.push("/");
            } catch (err) {
                setLoader(false);
                setError(err.message);
                setUserName("");
                setFullName("");
                setEmail("");
                setPassword("");
            }
        } else {
            setLoader(false);
            setUserName("");
            setError("Username already Exists! Try a different Username...");
        }
    };
    return (
        <div className="signup">
            <Helmet>
                <title>Instagram</title>
            </Helmet>
            <div className="container flex justify-center mx-auto items-center h-screen max-w-screen-md ">
               
                <div className="flex flex-col w-5/6  md:w-2/5">
                    <div className="signup-form">
                        
                    <img className="instagram-logo" src={instagram} alt="" />
                        <form onSubmit={submitHandler}>
                            <input
                                value={fullName}
                                onChange={({ target }) =>
                                    setFullName(target.value)
                                }
                                type="text"
                                placeholder="Full Name"
                                className="input1"
                            />
                            <input
                                className="input2"
                                value={userName}
                                onChange={({ target }) =>
                                    setUserName(target.value)
                                }
                                type="text"
                                placeholder="Username"
                                
                            />

                            <input
                                value={email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                type="email"
                                placeholder="Email"
                                className="input2"
                            />

                            <input
                                value={password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                type="password"
                                placeholder="Password"
                                className="input3"
                            />
                            <button
                                className="login-btn bg-blue"
                                type="submit"
                                disabled={isInvalid}
                            >
                                {loader ? <Spinner /> : "Sign up"}
                            </button>
                            <p className=" text-[#858a8f] text-ml mt-7 ml-5 ">
                                Users of our services may have uploaded your contact information to Instagram.
                                <span className="text-[#4cb5f9]"> Find out more</span>{" "}
                             </p>
                            <p className="text-ml text-[#858a8f] mt-2 ml-5">
                                By registering, you agree to the{" "}
                                <span className="text-[#4cb5f9]">Rules</span> ,{" "}
                                <span className="text-[#4cb5f9]">Privacy policy</span> and <br />
                                <span className="text-[#4cb5f9]">Cookie policy</span> ours.
                            </p>

                            <p className="text-xl ml-[65px] mt-5">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-blue">
                                Sign in
                            </Link>
                        </p>
                        </form>
                    </div>

                    {/* <div className="signup-app">
                        <p className="  text-xl justify-center items-center">Get the app</p>
                        <div className="flex"> 
                            <img className="w-[205px] h-65 mt-2 cursor-pointer" src={googlePlay} alt="" />
                            <img className="app-miсoStore" src={miсoStore} alt="" />
                            <img className="app-miсoStore" src={microsoft} alt="" />
                        </div>
                    </div> */}

                    {error && (
                        <div className="flex justify-center items-center bg-white p-4 border border-gray-border rounded sm:mx-4">
                            <p className="text-sm text-red-error">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Registration;

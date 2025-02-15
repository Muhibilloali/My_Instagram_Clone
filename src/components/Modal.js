import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { fireStore } from "../firebase/config";
import { getvalidPhotoSize } from "../services/services";
import { avatar } from "./assets";
import ProgressBar from "./ProgressBar";

const Modal = ({ user, setIsModal }) => {
    const [file, setFile] = useState(null);
    const [isUrl, setIsUrl] = useState("");
    const [error, setError] = useState("");
    const [caption, setCaption] = useState("");

    

    const history = useHistory();

    const disableButton = isUrl === "" || caption === "";
    const hideModal = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setIsModal(false);
            setFile(null);
        }
    };

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    const handleProfilePhoto = (e) => {
        const selected = e.target.files[0];
        const isValid = validTypes.includes(selected.type);
        const vlaidSize = getvalidPhotoSize(selected.size);

        if (!isValid) {
            setError("Please select a valid Image");
            setFile(null);
        }
        if (!vlaidSize && isValid) {
            setError("Image size must be less than 500KB");
            setFile(null);
        }
        if (isValid && vlaidSize) {
            setFile(selected);
            setError("");
        }
    };
    const handlePost = () => {
        fireStore
            .collection("photos")
            .add({
                caption,
                comments: [],
                dateCreated: Date.now(),
                likes: [],
                userUId: user.uid,
                imageSrc: isUrl,
            })
            .then(() => {
                setFile(null);
                setIsUrl("");
                setCaption("");
                setError("");
                history.push("/");
            });
    };
    return (
        <div
            className="absolute z-50 bg-black-faded top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop"
            role="button"
            tabIndex="0"
            onClick={hideModal}
        >
            <motion.div
                initial={{ y: "-100vh" }}
                animate={{ y: "0" }}
                className="bg-white container mx-auto md:max-w-screen-sm  rounded-xl flex flex-col "
            >
                <div className="flex border-b border-gray-border py-2  items-center">
                    <p className="text-center w-11/12 text-xl font-bold text-black-icons">
                        Create Post
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsModal(false)}
                        className="text-right text-xl bg-gray-text shadow rounded-full text-white p-2 hover:bg-red-rose"
                    >
                        <BsXCircle />
                    </button>
                </div>

                <div>
                    {file && (
                        <ProgressBar
                            file={file}
                            setFile={setFile}
                            setIsUrl={setIsUrl}
                        />
                    )}
                </div>

                <div className="px-4 mt-4 mb-2 flex items-center space-x-4">
                    <img
                        className=" h-12 w-12 rounded-full "
                        src={user.photo || avatar}
                        alt=""
                    />
                    <textarea
                        type="text"
                        aria-multiline
                        onChange={(e) => setCaption(e.target.value)}
                        autoComplete="off"
                        placeholder="Comment about the picture"
                        className="flex-1 bg-gray-bg text-black-icons py-2 px-4 rounded outline-none border border-gray-border h-16 "
                    />
                </div>
                {isUrl && (
                    <div>
                        <img
                            style={{ maxHeight: "50vh" }}
                            className="w-full object-cover"
                            src={isUrl}
                            alt="postPhoto"
                        />
                    </div>
                )}
                <div className=" items-center justify-center space-x-4 mx-40 pb-4 mt-5">
                    <label
                        htmlFor="postPhoto"
                        name="profile"
                        className="bg-red-rose  p-20 hover:cursor-pointer text-white rounded mb-5 flex justify-center items-center text-5xl font-bold shadow"
                    >
                        <BiImageAdd />
                        <input
                            className="hidden"
                            type="file"
                            id="postPhoto"
                            name="profile"
                            onChange={handleProfilePhoto}
                        />
                    </label>

                    <button
                        type="button"
                        onClick={handlePost}
                        disabled={disableButton}
                        className="flex-1 flex justify-center items-center w-full bg-opacity-80 bg-blue hover:bg-opacity-95 p-4 rounded text-white h-10  font-bold uppercase shadow disabled:opacity-50"
                    >
                        Post
                    </button>
                </div>
                {error && (
                    <p className="text-center text-red-error mx-4 pb-3 ">
                        {error}
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default Modal;

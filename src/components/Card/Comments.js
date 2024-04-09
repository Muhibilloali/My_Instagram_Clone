import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const Comments = ({ content }) => (
    <div>
        <div className="pointer text-sm text-black my-2 ">
            <span className="font-bold pointer hover:underline cursor-pointer">
                <Link to={`/${content.username}`} /> {content.username}
            </span>{" "}
            {content.comment}
            <div>
                <span className="text-xs text-gray-text pl-1">
                    {moment(content.createdAt).format("ddd, MMM D, h:mm a")}
                </span>
            </div>
        </div>
    </div>
);

export default Comments;

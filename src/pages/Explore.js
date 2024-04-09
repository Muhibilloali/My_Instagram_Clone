import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import ExploreProfiles from "../components/ExploreProfiles";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import { getSuggestedUsers } from "../services/services";

const Explore = () => {
    const { user } = useUser();
    const [userProfiles, setUserProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getSuggestedProfiles = async () => {
            setLoading(true);
            try {
                const profiles = await getSuggestedUsers(
                    user.uid,
                    user.following,
                    20
                );
                setUserProfiles(profiles);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        if (user.uid) {
            getSuggestedProfiles();
        }
    }, [user.following, user.uid]);

    let content = null;
    if (loading) {
        content = (
            <div className="flex justify-between items-center p-2 px-8 mb-1">
                <Skeleton count={7} width={300} height={80} />
            </div>
        );
    }
    if (!loading && userProfiles.length > 0) {
        content = userProfiles.map((item) => (
            <ExploreProfiles
                key={item.docId}
                user={item}
                authUserUid={user.uid}
                authUserDocId={user.docId}
            />
        ));
    }
    if (!loading && userProfiles.length === 0) {
        content = (
            <p className="text-red-error text-lg font-bold p-2 my-5">
                No users available!
            </p>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Instagram - Explore Users</title>
            </Helmet>
            <div className="h-screen overflow-auto pb-16 flex-col">
                <Header />

                <div className="container mx-auto  max-w-screen-md  mt-24  flex justify-center">
                    <div className="w-w/6  sm:w-4/6  bg-white ">
                        <div className="text-md font-bold mb-6 m-4">
                            Suggested
                        </div>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;

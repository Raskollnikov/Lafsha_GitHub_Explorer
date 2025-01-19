import ProfileInfo from "../components/ProfileInfo";
import Repos  from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import { useCallback, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import Spinner from "../components/Spinner";

const HomePage = () => {
    const [userProfile, setUserProfile] = useState(null);

    const [repos,setRepos] = useState([])
    const [loading,setLoading]=useState(false);


    const getUserProfileAndRepos = useCallback(async (username = "Raskollnikov") => {
        setLoading(true);
        try {
            // Fetch user profile
            const userRes = await fetch(`https://api.github.com/users/${username}`);
            if (!userRes.ok) throw new Error("Failed to fetch user profile.");
            const userProfile = await userRes.json();
    
            // Fetch repos
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!reposRes.ok) throw new Error("Failed to fetch repositories.");
            const repos = await reposRes.json();
    
            setUserProfile(userProfile);
            setRepos(repos);
    
            return { userProfile, repos };
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);
    

	useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);

    return (
    <div className="m-4">
        <Search/>
        <SortRepos/>
        <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
            {userProfile && !loading &&<ProfileInfo userProfile={userProfile} />}
            {repos.length>0&&!loading && <Repos repos={repos}/>}
            {loading&&<Spinner/>}
        </div>
    </div>
    );
};

export default HomePage;

export const getUserProfileAndRepos=async(req,res)=>{
    const {userName} = req.params;
    try {
        const userRes = await fetch(`https://api.github.com/users/${userName}`,{
            headers:{
                authorization:`token ${process.env.GITHUB_API_KEY}`
            }
        });

        const userData = await userRes.json();
        
        const repoRes = await fetch(userData.repos_url,{
            headers:{
                authorization:`token ${process.env.GITHUB_API_KEY}`
            }
        })

        const repos = await repoRes.json();

        res.status(200).json({userProfile:userData,repos})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


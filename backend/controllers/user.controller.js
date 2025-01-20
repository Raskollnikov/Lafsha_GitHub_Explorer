
import User from '../models/user.model.js'

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

export const LikeProfile=async(req,res)=>{
    try {
        const {userName} = req.params;
        const user = await User.findById(req.user._id.toString())
        console.log("this : ",user)
        const userToLike =await User.findOne({username:userName})

        if(!userToLike){
            return res.status(404).json({error:"User is not a member of this app"})
        }

        if(user.likedProfiles.includes(userToLike.username)){
            return res.status(400).json({error:"User already liked"})
        }

        userToLike.likedBy.push({username:user.username,avatarUrl:user.avatarUrl,likedDate:Date.now()})
        user.likedProfiles.push(userToLike.username)

        await Promise.all([userToLike.save(),user.save()])

        res.status(200).json({message:"user liked successfully!"})
    
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getLikes=async(req,res)=>{
    try {
        const user = await User.findById(req.user._id.toString())
        res.status(200).json({likedBy:user.likedBy})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
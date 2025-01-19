export const explore=async(req,res)=>{
    const {language} = req.params;

    try {
        const langData= await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
            headers:{
                authorization:`token ${process.env.GITHUB_API_KEY}`
            }
        })

        const resData = await langData.json();

        res.status(200).json({items:resData.items})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
import express from 'express'
import exploreRoutes from './routes/explore.route.js'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

dotenv.config();

app.use(cors())
app.get('/',(req,res)=>{
    res.send('Server is ready')
})

app.use('/api/users',userRoutes)
app.use('/api/explore',exploreRoutes)

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})
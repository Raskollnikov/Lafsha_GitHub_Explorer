import express from 'express'
import exploreRoutes from './routes/explore.route.js'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './db/connect.js'
import passport from 'passport'
import "./passport/github.auth.js"
import session from 'express-session'

const app = express();

dotenv.config();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors())
app.get('/',(req,res)=>{
    res.send('Server is ready')
})

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/explore',exploreRoutes)

app.listen(5000,()=>{
    console.log("server is running on port 5000")
    connectDb();
})
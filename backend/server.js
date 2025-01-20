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
import path from 'path'

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();

dotenv.config();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/explore',exploreRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'));
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDb();
})
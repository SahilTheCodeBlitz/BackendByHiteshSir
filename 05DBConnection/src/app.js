import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const  app = express()

// using different middlewares

app.use(cors({
    origin:process.env.CORSORIGIN,// specified in the dotenv which origi to allow
}))



// middleware to handle the json data also setting the limit i.e size 
// of the json data

// parses the json data coming from request.body

app.use(express.json({limit:"16kb"}))


// middleware to handle the request data which is in the form of the url

app.use(express.urlencoded({limit:"16kb",extended:true}))

// this is middleware function that serves static files such as images, CSS files, 
//JavaScript files, and other assets from a specified directory.
// This is useful for web applications that need to deliver these 
// assets directly to the client's browser.

app.use(express.static('public'))

// cookie parser middleware allow to store cookie at client side
// or manipulate cookie from server

app.use(cookieParser())





import userRouter from './routes/User.routes.js'

app.use('/api/v1/user',userRouter)

export default  app ;

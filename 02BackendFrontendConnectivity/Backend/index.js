import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT || 4000

const jokes = [
    {
        title:"Joke 1",
        description:"This is first Joke"        
    },
    {
        title:"Joke 2",
        description:"This is second Joke"        
    },
    {
        title:"Joke 3",
        description:"This is third Joke"        
    },
    {
        title:"Joke 4",
        description:"This is fourth Joke"        
    }
]

app.get('/api/jokes',(req,res)=>{
    res.json(jokes)
})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})


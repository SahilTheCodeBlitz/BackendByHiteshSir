// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import { DBNAME } from './constant.js';
// import express from 'express'

// dotenv.config()

// const app = express ()

// const port = process.env.PORT || 3000


// // writing the code in the iffe function
// // this code will be firstly executed

// ;( async()=>{
    
//     try {

//         const connectionInstance = await mongoose.connect(`${process.env.MONGOCONNECTIONURI}/${DBNAME}`)

//         // error ayega to cath block execute hoga

//         console.log(`mongoose connected successfully at DB HOST ${connectionInstance.connection.host}`);

//         // so as connection established so lets listen the port

//         app.listen(port,()=>{
//             console.log(`server is listening at port ${port} `);
//         })

//     } catch (error) {
//         console.log('mongodb connection error',error);
//         process.exit(1)

//     }
// })()





// lets go with second approach

import dotenv from 'dotenv'

dotenv.config()

// importing mongoose connection method 

import { connDbMethod } from './db/connection.js'
import app from './app.js'

(async()=>{

    await connDbMethod().then(()=>{
        // if success happens in connecting with database
        const port = process.env.PORT||4000;

        app.listen(port,()=>{
            console.log(`server is listening at port ${port}`);
        })

    }).catch((error)=>{
        console.log(`error in mongodb connection = ${error}`);
    }) 
       
})()
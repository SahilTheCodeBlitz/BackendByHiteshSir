import mongoose from 'mongoose'
import { DBNAME } from '../constant.js'

export const connDbMethod= async()=>{
    try {
        const mongodbInstance = await  mongoose.connect(`${process.env.MONGOCONNECTIONURI}/${DBNAME}`) 
        
        // ye line execute means code successfull

        console.log(`connected to mongodb successfully`);

        // console.log(mongodbInstance);


    } catch (error) {
        console.log(`mongodb connection failed err msg = ${error}`);
        
    }
}
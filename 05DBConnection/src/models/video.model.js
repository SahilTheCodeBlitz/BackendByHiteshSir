import mongoose, { mongo } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,//cloudinary url 
        required:true
    },
    thumbnail:{
        type:String,//cloudinary url
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number, // cloudinary se lenge
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    // owner field  ie special field owner will have similar datafield to user
    // owner infact himslef is the user so we will set this owner 
    // field by taking struture of USer field
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
    

},{timestamps:true})

// adding mongooseAggregatePaginate plugin

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',videoSchema)
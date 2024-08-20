import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, // cloudenary se image string milegi
        required:true
    },
    coverImage:{
        type:String, // cloudenary se image string milegi
        required:true 
    },
    // watch history is special type of field it is array of video
    // objects that we take from the Video model  

    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }



},{timestamps:true})

userSchema.pre('save',async function (next){
    // pre is like the middleware so after exectuing this the 
    // control has to goto  the next part
    
    // to make sure only when password updated the password shoul
    // be encrypted and not every time when user saves his
    // data 

    if(this.isModified("password")){
        this.password =await  bcrypt.hash(this.password,10)
        next()
    }else{
        return next()
    }
    
})

// adding a method to compare password get from input and database password

userSchema.methods.comparePassword = async function(inpPassword){
    const result =await  bcrypt.compare(inpPassword,this.password)
    // boolean result  milega
    return result
}

//adding antoher method to schema

userSchema.methods.generateAccessToken= async function(){
    const token = jwt.sign({
        // this mtlb database se aa rhi hai is case mei
        _id:this.id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESSTOKENSECRET,
    {
        expiresIn:process.env.ACCESSTOKENEXPIRY
    }
    )

    return token;
}


userSchema.methods.generateRefreshToken = function (){
    const token = jwt.sign({
        _id:thid.id
    },
    process.env.REFRESHTOKENSECRET,
    {
        expiresIn:process.env.REFRESHTOKENEXPIRY
    }
    )

    return token
}


export const User = mongoose.model('User',userSchema)
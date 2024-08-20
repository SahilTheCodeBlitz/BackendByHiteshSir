import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { fileUploadToCloudinary } from "../utils/cloudinaryFileUplod.js";
import { User } from "../models/user.model.js";
import { response } from "express";

// creating the function that will handle /register route

export const registerController =  asyncHandler(async(req,res)=>{
    
    // res.json({message:"Everything working"})

    // for registration we will first make strategy how to 
    // achieve it and what does we want

    // step 1 ] get user details from frontend but for now postman
    // step 2 ] validation of the received details
    // step 3 ] checking whehter user already exist or not: based on 
    // usernname and email
    // step 4 ] check for images avatar and for coverImage
    // step 5 ] upload image to local storage using multer
    // step 6 ] upload image to cloudinary
    // step 7 ] create a user object - create entry in db
    // step 8 ] Remove pass and refresh token field from user object
    // step 9 ] send response to the client

    const {username,email,fullname,password} = req.body
    
    console.log('req.body = ',req.body);
    console.log(`user name = ${username} email = ${email} fullName = ${fullname} password = ${password} `);

    // express file data nhi laa payega so what will happen is
    // that we will use multer middleware
    // goto user.route.js and add the middleware there
    
    // console.log(username,' ',email,' ',fullname,' ',password);

    // data sab aa gya hai ab validation ka kam 

    if (username.trim()==''||email.trim()==''||fullname.trim()==''||password.trim()=='') {
        throw new ApiError(400,'PLease enter all the fields')        
    }

    // validation done now we have all the data so before registering
    // the user we will check whether user already exist in the data
    // base or not
    // for htat we can use user model as it has instance of database

    

    const userCheck = await User.findOne({username})
    const emailCheck = await User.findOne({email}) 

    if(userCheck ||  emailCheck){
        //means user exist so in this case throw error
        throw new ApiError(402,'User already exist')
    }

    // validate avatar and coverImage
    // avatar is compulsory whereas coverImage is optional field

    console.log('req.files',req.files);
        // check for avatar

    if (!req.files.avatar || !req.files.avatar[0] || !req.files.avatar[0].path) {
        throw new ApiError(402,'Avatar Image does not exist')        
    }

    const avatarLocalPath = req.files.avatar[0].path;

    // check and validation for cover image
    let coverImageLocalPath = ''
    let cloudinaryCoverImageUrl =''

    if (req.files.coverImage) {
        coverImageLocalPath = req.files.coverImage[0].path        
    }
    

    // console.log('avatar = ', avatarLocalPath);
    // console.log('coverimage = ',coverImageLocalPath)



    // upload the images to cloudinary

    // now we have the upload file to cloudinary

    const avatarCloud = await fileUploadToCloudinary(avatarLocalPath)
   
    const avatarCloudianryUrl = avatarCloud.url

    if (coverImageLocalPath!='') {
        // uploading data to cloudinary

        const coverImageCloud = await fileUploadToCloudinary(coverImageLocalPath)
        cloudinaryCoverImageUrl = coverImageCloud.url
        
    }

    // url of both images

    console.log('avatarCloudianryUrl',avatarCloudianryUrl);
    console.log('coverImageCloudUrl',cloudinaryCoverImageUrl);
    

    // now next step is to create a user in database
    // i.e adding the data to database

    const user = await User.create({
        username:username.toLowerCase(),
        email:email,
        password:password,
        fullname:fullname,
        avatar:avatarCloudianryUrl,
        coverImage:cloudinaryCoverImageUrl                
    })

    // user save hone se pehle pre me jo method hai vo run hoga
    //i.e it is used for hashing the password

    console.log(user);

    // our job is to now remove token and password field and send response
    // to the front end i.e postman for now
    
    const resObj =    {username:username.toLowerCase(),
        email:email,      
        fullname:fullname,
        avatar:avatarCloudianryUrl,
        coverImage:cloudinaryCoverImageUrl
    }

    return res.status(202).json(
        new ApiResponse(202,resObj,'registration successfull')
    )

    

    // res.json({message:"Everything working"})


})  



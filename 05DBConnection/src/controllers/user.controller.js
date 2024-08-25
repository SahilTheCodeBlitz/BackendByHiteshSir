import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { fileUploadToCloudinary } from "../utils/cloudinaryFileUplod.js";
import { User } from "../models/user.model.js";
import { response } from "express";
import jwt from 'jsonwebtoken'

// creating the function that will handle /register route

export const registerController = asyncHandler(async (req, res) => {
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

  const { username, email, fullname, password } = req.body;

  console.log("req.body = ", req.body);
  console.log(
    `user name = ${username} email = ${email} fullName = ${fullname} password = ${password} `
  );

  // express file data nhi laa payega so what will happen is
  // that we will use multer middleware
  // goto user.route.js and add the middleware there

  // console.log(username,' ',email,' ',fullname,' ',password);

  // data sab aa gya hai ab validation ka kam

  if (
    username.trim() == "" ||
    email.trim() == "" ||
    fullname.trim() == "" ||
    password.trim() == ""
  ) {
    throw new ApiError(400, "PLease enter all the fields");
  }

  // validation done now we have all the data so before registering
  // the user we will check whether user already exist in the data
  // base or not
  // for htat we can use user model as it has instance of database

  const userCheck = await User.findOne({ username });
  const emailCheck = await User.findOne({ email });

  if (userCheck || emailCheck) {
    //means user exist so in this case throw error
    throw new ApiError(402, "User already exist");
  }

  // validate avatar and coverImage
  // avatar is compulsory whereas coverImage is optional field

  console.log("req.files", req.files);
  // check for avatar

  if (!req.files.avatar || !req.files.avatar[0] || !req.files.avatar[0].path) {
    throw new ApiError(402, "Avatar Image does not exist");
  }

  const avatarLocalPath = req.files.avatar[0].path;

  // check and validation for cover image
  let coverImageLocalPath = "";
  let cloudinaryCoverImageUrl = "";

  if (req.files.coverImage) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // console.log('avatar = ', avatarLocalPath);
  // console.log('coverimage = ',coverImageLocalPath)

  // upload the images to cloudinary

  // now we have the upload file to cloudinary

  const avatarCloud = await fileUploadToCloudinary(avatarLocalPath);

  const avatarCloudianryUrl = avatarCloud.url;

  if (coverImageLocalPath != "") {
    // uploading data to cloudinary

    const coverImageCloud = await fileUploadToCloudinary(coverImageLocalPath);
    cloudinaryCoverImageUrl = coverImageCloud.url;
  }

  // url of both images

  console.log("avatarCloudianryUrl", avatarCloudianryUrl);
  console.log("coverImageCloudUrl", cloudinaryCoverImageUrl);

  // now next step is to create a user in database
  // i.e adding the data to database

  const user = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
    fullname: fullname,
    avatar: avatarCloudianryUrl,
    coverImage: cloudinaryCoverImageUrl,
  });

  // user save hone se pehle pre me jo method hai vo run hoga
  //i.e it is used for hashing the password

  console.log(user);

  // our job is to now remove token and password field and send response
  // to the front end i.e postman for now

  const resObj = {
    username: username.toLowerCase(),
    email: email,
    fullname: fullname,
    avatar: avatarCloudianryUrl,
    coverImage: cloudinaryCoverImageUrl,
  };

  return res
    .status(202)
    .json(new ApiResponse(202, resObj, "registration successfull"));

  // res.json({message:"Everything working"})
});

// method for generating tokens

const generateToken = async (userId) => {
  // hume userId milgyi
  // hum isse user nikalenge database me se

  // if you look at genratetoken methods at user schema
  // there we need user information like username,
  // id,fullname etc to generate token if we call
  // that method using the got user then definelty
  // the method will have access to all this data

  // store the refresh token to the  database
  // return refreshtoken and accesstoken

  const user = await User.findById(userId);

  // validation if user exist or not

  console.log('t1 user' , user);

  if (!user) {
    throw new ApiError(400, "some error while generating tokens");
  }

  // generating tokens

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  console.log('test 1','accesstoken = ',accessToken);
  console.log('test 2','refreshtoken = ',refreshToken);



  // validating the tokens

  if (!accessToken || !refreshToken || accessToken==''||refreshToken=='') {
    throw new ApiError(400, "some error while generating tokens");
  }

  // storing the refresh token to the database

  user.refreshToken = refreshToken;

  // isko direct save karenge to error ayega kyuki
  // we have to pss the fields like passwords etc that are
  // compulsory so to avoid these

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// login controllers

export const loginUser = asyncHandler(async (req, res) => {
  // plan for doing login
  // take the input from req.body
  // validate the input
  // decide what to use for login email,username as both are unique
  // say we used useranme or email
  // find the user in database by refering to username
  // check password is same or not
  // username found then generate access and refresh token
  // store the refresh token to database
  // send cookie which have both tokens

  console.log(req.body);

  // taking the user input

  const { username, email, password } = req.body;

  // validate the input
  if (
    !username ||
    username == "" ||
    !email ||
    email == "" ||
    !password ||
    password == ""
  ) {
    console.log(username,email,password);
    throw new ApiError(400, "Some of the field is empty");
  }

  // using or operation in mongodb to find either username or email

  const user = await User.findOne({ $or: [{ username }, { email }] });

  console.log(user);
  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  // checking the password is correct or not

  // we create a method for checkingPasswordCorrect in user schema
  // to call that method we have to call it on user not User

  const passCheck = await user.comparePassword(password); //passing password we got from input

  if (!passCheck) {
    throw new ApiError(401, "wrong password");
  }

  // if everything is fine then generate access and refresh token

  const { accessToken, refreshToken } = await generateToken(user._id);

  // tokens got

  // now we want data that we have to send to the user
  // remember user is outdated because e updated the database in
  // geenerate function call

  const loggedUser = await User
    .findById(user._id)
    .select("-password -refreshToken");

  // sending response

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("accessToken", accessToken, cookieOptions)
    .cookie('refreshToken',refreshToken,cookieOptions).json(
        new ApiResponse(200,{loggedUser,
            'accessToken':accessToken,
            'refreshToken':refreshToken
        },
        'logged in successfull')
    )
});


// lets create a handler for logging out

export const logout = asyncHandler( async (req,res)=>{
  // we have to delete the refresh token i.e set it undefined
  // ise pehle middleware execute hoga jha req.user object jisp user detail hai vo join hoga
  // delete cookies also

  console.log(req.user);

    await User.findByIdAndUpdate(req.user._id,
    {
    $set :{
      refreshToken:undefined
    }
    },
    {
      new:true
    }
        
  )

  // and now have to update the cokkies rhr is set it to null and sending respnse

  const options = {
    httpOnly:true,
    secure:true
  }

  return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).
  json(new ApiResponse(200,{},"logout successfull"))

})


// writing controller to regenrate refresh and access token if access token
// token expires and we get refresh token as the cookie then 
// matching and if matched then send new access and refresh token
// as a cookie 

export const refreshBothToken = asyncHandler(async (req,res)=>{
  
  console.log('cookies . req',req.cookies);

  const inputRefreshToken = req.cookies.refreshToken ;
  
  if(!inputRefreshToken){
    throw new ApiError(402,"Invalid refresh token")    
  }  

  const decodedRefreshToken = jwt.verify(inputRefreshToken,process.env.REFRESHTOKENSECRET)
  
  const userId = decodedRefreshToken._id

  console.log('userid',userId);

  const user = await User.findById(userId)

  if(!user){
    throw new ApiError(402,"Invalid Reequest")
  }

  const databaseRefreshToken = user.refreshToken

  // COMPARING IF Both the refreshtoken that is token received
  // from the cookie and database aer same or not

  if(!(databaseRefreshToken===inputRefreshToken)){
    throw new ApiError(402,"Invalid Refresh token please login through password")
  }

  // if everything fine then regenerate access and refresh token

  const {accessToken: newAccessToken, refreshToken: newRefreshToken} =await generateToken(userId)

  console.log('new Acees token = ',newAccessToken,'ne refresh token=',newRefreshToken);

  const options = {
    httpOnly:true,
    secure:true
  }

  // sending new updated cookies as respose and success message
  // on receiving this success message frontend me user ko access do
  // homepage ka

  res.status(200).cookie('accessToken',newAccessToken,options).cookie('refreshToken',newRefreshToken,options).json(
    new ApiResponse(200,{'accessToken':newAccessToken,'refreshToken':newRefreshToken},'tokens reset successfully')
  )      
  
})



export const testController =(req,res)=>{
  console.log(req.body);
  res.json({message:"Everytinh working fine"})
}
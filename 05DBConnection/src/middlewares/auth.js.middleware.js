import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifJwt = asyncHandler(async (req,res,next)=>{

    const token = req.cookies.accessToken
    
    if (!token) {
        throw new ApiError(402,"Error in Token")        
    }

    const decodeToken = jwt.verify(token,process.envACCESSTOKENSECRET)
    
    console.log(decodeToken);

    const user = await User.findById(decodeToken._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(402,'User doesnt exist')
        
    }
    // req object me user ki details store

    req.user = user

    next()
    

})
import { Router } from "express";
import { registerController } from "../controllers/user.controller.js";
const router = Router()
import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";

// adding multer middleware to capture the files send through post
router.route('/register').post(
    upload.fields([{
        name:'avatar',
        maxCount:1
    },
    {
        name:'coverImage',
        maxCount:1
    }
]
    ),
    
    registerController)


export default router
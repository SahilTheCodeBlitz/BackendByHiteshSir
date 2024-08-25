import { Router } from "express";
import { loginUser, logout, refreshBothToken, registerController, testController } from "../controllers/user.controller.js";
const router = Router()
import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";
import { verifJwt } from "../middlewares/auth.middleware.js";

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
    
    registerController);


router.route('/login').post(loginUser) 
   
router.route('/logout').post(verifJwt,logout) // verify jwt is middleare

router.route('/refresh-token').post(refreshBothToken)

router.route('/test').post(testController)





export default router
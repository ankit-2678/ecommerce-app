import express from "express";
import { loginUser, adminLogin, registerUser, getUserProfile, updateUserProfile, changeUserPassword } from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import authUser from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/profile', authUser, getUserProfile)
userRouter.put('/profile', authUser, upload.single("image"), updateUserProfile)
userRouter.post('/change-password', authUser, changeUserPassword)

export default userRouter;


import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { v2 as cloudinary } from 'cloudinary'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
// route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "password is wrong" })
        }
        const token = createToken(user._id)
        res.json({ success: true, token, user: { name: user.name, email: user.email } })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// route for user register

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// route for admin login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, token })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = req.user;


        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                _id: user._id,
                image: user.image
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name } = req.body;

        let imageUrl = user.image;


        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            });

            imageUrl = result.secure_url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { name,  image: imageUrl },
            { returnDocument: "after" }
        ).select("-password");

        res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log("PROFILE UPDATE ERROR:", error);
        res.json({ success: false, message: error.message });
    }
};;
export {
    loginUser,
    registerUser,
    adminLogin,
    getUserProfile,
    updateUserProfile,
};
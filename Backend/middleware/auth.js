import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login again" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(token_decode.id).select("-password");

        req.user = user; // 🔥 IMPORTANT
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default authUser;
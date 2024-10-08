import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

const getUserDetailsFromToken = async (token) => {
    console.log("token",token)
    if (!token) {
        return {
            message: "Session Out",
            logout: true,
        }
    }
    const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await User.findById(decode.id).select("-password")
    return user

    // try {
    //     const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    //     const user = await User.findById(decode.id).select("-password");
    //     if (!user) {
    //         return {
    //             message: "User not found",
    //             logout: true,
    //         };
    //     }
    //     return user;
    // } catch (error) {
    //     // Catch the error and return appropriate message
    //     return {
    //         message: "Invalid token, session expired",
    //         logout: true,
    //     };
    // }

}

export default getUserDetailsFromToken
import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

export const generateTokenAndSetCookie = (userId , res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {
        expiresIn: "2d"
    }); // signing the token with the user id and the secret key and setting the token to expire in 2 days

    res.cookie("netoken", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        httpOnly:true, // cookie cannot be accessed by client side javascript to prevent XSS attacks
        sameSite:"strict", // CSRF protection
        secure: ENV_VARS.NODE_ENV !== "development" // cookie will only be set in https in production
     }
    );

    return token;
}


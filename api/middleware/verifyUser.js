import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        throw new ApiError(401, 'Unauthorized')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            throw new ApiError(403, 'Token is not valid')
        }

        req.user = user;
        next()
    })
}
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";



export const test = async (req, res) => {
    res.json({ Message: 'Hello World'})
}

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ([ username, email, password ].some((field) => field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required')
    }

    const existingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (existingUser) {
        throw new ApiError(400, 'User already exists')
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password: hashedPassword
    })

    const newUser = await User.findById(user._id).select('-password')

    if (!newUser) {
        throw new ApiError(404, 'Faild to create user')
    }

    return res
    .status(201)
    .json( new ApiResponse(201, 'User created successfully', newUser) )
}) 
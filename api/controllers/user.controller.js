import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



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


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([ email, password ].some((field) => field?.trim() === '')) {
        throw new ApiError(401, 'All fields are required')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(401, 'Invalid email')
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invali dpassword')
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    const loggedInUser = await User.findById(user._id).select('-password')

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie('access_token', token, options)
    .json( new ApiResponse(200, 'User logged in successfully', loggedInUser) )
})
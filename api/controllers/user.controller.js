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


export const google = asyncHandler(async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;
    const user = await User.findOne({ email })

    if (user) {
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
    } else {
        const generatedPassword = Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

        const newUser = await User.create({
            username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
            email,
            password: hashedPassword,
            profilePicture: googlePhotoUrl,
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        const loggedInUser = await User.findById(newUser._id).select('-password')

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie('access_token', token, options)
        .json( new ApiResponse(200, 'User logged in successfully', loggedInUser) )
    }
})

export const updateUser = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        throw new ApiError(401, 'Unauthorized')
    }

    if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            },
        },
        { new: true }
    );

    const updatedUser = await User.findById(user._id).select('-password')

    return res
    .status(200)
    .json( new ApiResponse(200, 'User updated successfully', updatedUser) )
})


export const deleteUser = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        throw new ApiError(401, 'you can delete only your account')
    }

    await User.findByIdAndDelete(req.params.id)

    return res
    .status(200)
    .json( new ApiResponse(200, 'User deleted successfully') )
})
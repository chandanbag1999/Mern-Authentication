import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtzD0_epA0Fdr9es_j9yrgvV33knKzYOI71qZ6PGlTw&s'
    },
    
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)
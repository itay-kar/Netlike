import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    image: { type: String },
    title: { type: String, required: true },
    searchType: { type: String, enum: ["person", "Movie", "TV"], required: true },
    createdAt: { type: Date, default: Date.now },
}, { _id: false });

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    searchHistory: {
        type: [searchHistorySchema],
        default: [],
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

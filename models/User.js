const mongoose = require('mongoose');

//creating  schema for the user

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    profilePicture: {
        type: String,
        default: "",

    },
    coverPicture: {
        type: String,
        default: "",

    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 20,
    },
    from: {
        type: String,
        max: 20,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    }


}, { timestamps: true });

//exporting user model 

module.exports = mongoose.model("User", UserSchema);
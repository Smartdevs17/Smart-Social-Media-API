const mongoose = require("mongoose");

//Create Schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: "",
    }
},{timestamps: true});

//Create user Model and Serilize User
const Admin = new mongoose.model("Admin",adminSchema);

module.exports = Admin;
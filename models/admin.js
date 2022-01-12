const mongoose = require("mongoose");

//Create Schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//Create user Model and Serilize User
const Admin = new mongoose.model("Admin",adminSchema);

module.exports = Admin;
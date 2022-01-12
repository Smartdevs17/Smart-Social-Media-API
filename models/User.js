const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
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
      min: 6,
    },
    phone: {
      type: Number,
      min: 6,
    },
    dob: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: Number
    },
    country: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
    terms: {
      type: String,
      required: true
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

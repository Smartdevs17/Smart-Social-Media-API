const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      dob: req.body.dob,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      terms: req.body.terms,
    });

    //save user and respond
    const user = await newUser.save();
    const { password,...others} = user._doc;
    res.status(201).json(others);
    console.log("Successfully Registered user")
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const users = await User.findOne({ email: req.body.email });
    // !user && ( res.status(404).json({message: "User not found"}));
    if(!users){
       return res.status(404).json({message: "User not found"})
    }
    const validPassword = await bcrypt.compare(req.body.password, users.password)
    // !validPassword &&  res.status(400).json({message: "Wrong Password"})
    if(!validPassword){
      return res.status(400).json({message: "Wrong Password"})
    };
    const {password, ...others} = user._doc;
    res.status(201).json(others)
    console.log("User have Successfully Login")
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

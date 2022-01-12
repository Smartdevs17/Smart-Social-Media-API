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

    const {password,...user} = users._doc;
    res.status(201).json(user)


  //   await User.findOne({ email: req.body.email},(err,user) => {
  //     if(err){
  //       console.log(err);
	// return;
  //     }else if(!user){
  //       res.status(404).json("User not found")
	// return;
  //     }else if(user){
  //           const validPassword =  bcrypt.compare(req.body.password, user.password);
  //           if(!validPassword){
  //             res.status(400).json("Wrong Password")
  //           }else{
  //            // const {password,...others} = user._doc;
  //             //     return res.status(201).json(others)
	// 	res.status(201).json(user)
	// 	return
  //           }
  //     }
  //   });
    
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

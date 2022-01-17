const Admin = require("../models/Admin");
const router = require("express").Router();
const bcrypt = require("bcrypt");


// REGISTER NEW ADMIN
//REGISTER
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new Admin({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        address: req.body.address,
        gender: req.body.gender,
        isAdmin: req.body.isAdmin,
      });
      //  console.log(req.body)
      //save user and respond
      const user = await newUser.save();
      const { password,...others} = user._doc;
      res.status(201).json(others);
      console.log("Successfully Created a New Admin ")
    } catch (err) {
      res.status(500).json(err)
    }
  });



//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedAdmin);
    //  console.log(updatedAdmin);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

///DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Admin.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    // !user && ( res.status(404).json({message: "User not found"}));
    if(!user){
       return res.status(404).json({message: "User not found"})
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
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

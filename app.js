// Require NPM packages
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const cors = require("cors")

app.use("/images", express.static(path.join(__dirname, "/images")));


// Connect to Mongodb
constconnection = require("./db/config");

if(process.env.PORT === "development"){
  app.use(morgan("dev"))
}

//middleware
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));
app.use(cors());



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});




app.get("/",(req,res) => {
  res.send("Backend is running Perfectly")
})


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);



port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started running on port ${port} `);
});

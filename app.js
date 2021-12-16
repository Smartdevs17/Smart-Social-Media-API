// Require NPM packages
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Connect to Mongodb
constconnection = require("./db/config");



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server started running on port ${port} `);
});

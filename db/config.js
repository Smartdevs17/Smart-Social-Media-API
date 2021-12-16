const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true})
const connection = mongoose.connection;
connection.on("error",(error) => console.error(error))
connection.once("open",() => console.log("Connected to DB"));

module.exports = connection;
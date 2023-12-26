const mongoose = require("mongoose");

// Mongo_uri = "mongodb+srv://madmax:muni183@cluster0.fbngpqj.mongodb.net/"

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

module.exports = connectDB;

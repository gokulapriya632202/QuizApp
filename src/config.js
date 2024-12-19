const mongoose = require("mongoose");

// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/User-txt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Define the schema
const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model
const collection = mongoose.model("users", LoginSchema);
module.exports = collection;

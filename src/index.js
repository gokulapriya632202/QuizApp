const express = require("express");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));
// Routes
// Route for the homepage
// Route for the homepage
app.get("/", (req, res) => {
  res.render("homepage"); // Render the homepage.ejs file
});

// Route for the login page
app.get("/login", (req, res) => {
  res.render("login", { message: null }); // Render the login.ejs file
});

// Route for the signup page
app.get("/signup", (req, res) => {
  res.render("signup", { message: null }); // Render the signup.ejs file
});

app.get("/startquiz", (req, res) => {
  res.render("startquiz");
});

app.get('/main', (req, res) => {
  res.render('main'); // Assuming you have main.ejs in the views directory
});

app.get('/instruction', (req, res) => {
  res.render('instruction'); // Renders instructions.ejs
});

app.get('/startquiz', (req, res) => {
  res.render('startquiz'); // Renders startquiz.ejs
});


app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.render("signup", {
        message: "User already exists. Please choose a different username.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const userdata = new collection({
      username,
      password: hashedPassword,
    });

    await userdata.save();
    console.log("User data saved:", userdata);
    res.render("login", { message: "Signup successful! You can now login." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.render("signup", {
      message: "An error occurred during signup. Please try again.",
    });
  }
});

app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user in the database
      const user = await collection.findOne({ username });
      if (!user) {
        return res.send("User not found. Please sign up first.");
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.send("Invalid password. Please try again.");
      }
  
      // Render homepage.ejs upon successful login
      res.render("main", { username });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("An error occurred during login.");
    }
  });

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

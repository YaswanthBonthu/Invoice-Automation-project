require("dotenv").config();
require("./utils/passport.js");
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set `secure: true` in production with HTTPS
  })
);


app.use(passport.session()); // Enable persistent login sessions
app.use(passport.initialize());

// Connect Database
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/invoices", require("./routes/invoiceRoutes"));
app.use("/automation", require("./routes/automationRoutes"));

app.get("/", (req, res) => {
    res.send(" Backend is Running! Welcome to Invoice Automation API.");
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

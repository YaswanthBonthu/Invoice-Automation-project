const express = require("express");
const passport = require("passport");
const {googleCallback} = require("../controllers/authController.js");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleCallback);

module.exports = router;

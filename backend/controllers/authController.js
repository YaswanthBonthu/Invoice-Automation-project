const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const googleCallback = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(400).send({ error: "Authentication failed. No user found." });
		}

		const user = req.user;
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		const userName = `${user.first_name} ${user.last_name}`;


		res.redirect(`${process.env.FRONTEND_URL}?token=${token}&userName=${userName}`);
	} catch (error) {
		console.error("Error in googleCallback:", error);
		res.status(500).send({ error: "Internal server error..." });
	}
};

module.exports = {googleCallback};

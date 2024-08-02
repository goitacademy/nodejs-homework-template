const gravatar = require("gravatar");
const User = require("../models/user");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const newUser = new User({
        email,
        password,
        avatarURL
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Error registering new user" });
    }
};

module.exports = { registerUser };

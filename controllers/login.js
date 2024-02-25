const express = require("express");
const router = express.Router();
const { User } = require("../models/schema");
const { createToken } = require("../models/token");

router.post("/login", async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({
        status: "error",
        code: 400,
        message: "User whit this email does not exist",
        });
    }
    if (!user || !user.validPassword(password)) {
        return res.json({
        status: "error",
        code: 401,
        message: "Password is wrong",
        });
    }
    const token = createToken(user._id);
    try {
        await User.updateOne({ email }, { token: token });
        res.json({
        status: "success",
        code: 200,
        data: { token },
        message: "User has been logged in",
        });
    } catch (error) {
        res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad Request",
        });
    }
});

module.exports = router;

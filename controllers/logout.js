const express = require("express");
const router = express.Router();
const { User } = require("../models/schema");

router.post("/logout", async (req, res) => {
    const { id, email } = req.user;
    try {
        await User.updateOne({ _id: id }, { token: null });
        res.json({
        status: "success",
        code: 200,
        data: { id, email },
        message: "User is logout",
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

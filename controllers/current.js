const express = require("express");
const router = express.Router();

    router.get("/current", async (req, res) => {
    const { id, email } = req.user;
    try {
        res.json({
        status: "success",
        code: 200,
        data: { id, email },
        message: "User data",
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

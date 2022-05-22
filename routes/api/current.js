const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email: email, subscription: subscription });
})

module.exports = router;
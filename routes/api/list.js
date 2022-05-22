const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const { email } = req.user;
    res.json({message: `You are authorized: ${email}`})
})

module.exports = router;
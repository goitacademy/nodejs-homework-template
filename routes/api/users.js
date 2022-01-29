const express = require('express');
const { authenticate } = require("../../middlewares");
const router = express.Router();

router.get('/current', authenticate, async(req, res, next) => {
    const { name, email } = req.user;
    res.json({
        user: {
            name,
            email
        }
    })
})

module.exports = router;
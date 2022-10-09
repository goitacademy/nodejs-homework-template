const express = require("express");

const router = express.Router();

const { APP_URL } = process.env;

router.get("/", (req, res) => {
  res.send(`<a href="${APP_URL}/api/users/google">Google login</a><br />
    <a href="${APP_URL}/api/users/facebook">Facebook login</a>`);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

router.get("/current", async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
    const { email } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
        },
      },
    });
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
});

module.exports = router;

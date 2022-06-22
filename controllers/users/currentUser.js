// const { User } = require("../../models");
// const createError = require("http-errors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = currentUser;

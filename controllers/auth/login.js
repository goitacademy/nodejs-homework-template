const { joiLoginSchema } = require("../../models");
const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    // JOI VALIDATION
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    //  EMAIL AND PASSWORD DB COMPARISON
    const { email, password } = req.body;
    // check if email is already in the database
    const user = await User.findOne({ email });
    // check if password is already in the database
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!user || !checkPassword || !user.verify) {
      throw new createError.Unauthorized(
        `Either email or password are not found or email is not verified`
      );
    }

    // // OPTION #2 Compare passwords using methods in Schema
    // if (!user || !user.comparePassword(password)) {
    //   throw new createError.Unauthorized(`Email or password are not found`);
    // }

    // TOKEN
    const payload = {
      id: user._id,
    };

    // create a Token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });

    // write the Token into Database to the user that just logged-in
    await User.findByIdAndUpdate(user._id, { token });

    // send response with token
    res.json({
      status: "success",
      code: 200,
      data: { token },
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

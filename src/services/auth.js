const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const {
  NotAuthorizedError,
  WrongParametersError,
} = require("../helpers/errors");

const registration = async (email, password) => {
  //  const userExists = await User.findOne({ email });
  //  if (user) {
  //    return res.status(409).json({
  //      status: "error",
  //      code: 409,
  //      message: "Email is already in use",
  //      data: "Conflict",
  //    });
  //  }
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();
  } catch (err) {
    console.error(err);
  }
};
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotAuthorizedError(`No user with email ${email}=()`);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new WrongParametersError(`Wrong password=()`);
    }
    const token = jwt.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET
    );
    return token;
    // const user = new User({
    //   email,
    //   password,
    // });
    // await user.save();
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  registration,
  login,
};

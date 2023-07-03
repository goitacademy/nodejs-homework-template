const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers");
// const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");
const { HttpError } = require("../../helpers");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new HttpError(400, "Validation error");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const token = generateToken(user._id);

    user.token = token;
    await user.save();
    console.log(`User with email: ${email} has logged in.`);
    res.status(200).json({ message: `Logged in`, user });

    // const user = await User.findOne({ email });

    // if (!user || !user.comparePassword(password)) {
    //   throw new HttpError(401, "Email or password is wrong");
    // }
    // const payload = {
    //   id: user._id,
    // };
    // const token = jwt.sign(payload, process.env.SECRET_KEY, {
    //   expiresIn: process.env.JWT_EXPIRE,
    // });
    // user.token = token;
    // await user.save();

    // // const loggedUser = await User.findByIdAndUpdate(user._id, { token });
    // console.log("Logged in".success);
    // res.status(200).json({ message: "Logged in", user });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

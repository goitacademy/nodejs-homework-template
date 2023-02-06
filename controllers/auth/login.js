const { User } = require("../../models");
const { SECRET_KEY } = process.env;
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //   console.log(User);
    const user = await User.findOne({ email });
    //   console.log(user);
    const passwordCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passwordCompare) {
      throw createError(401, "Email or password is wrong");
    }
    // create payload for token
    const payload = {
      id: user._id,
    };
    // create token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    // response answer with data
    res.json({
      status: "Success",
      code: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
const bcrypt = require("bcrypt");
const { User } = require("../../service");
// const { RequestError } = require("../../helpers/RequestError");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({ email });
    if (user) {
      // throw RequestError(409, Email in use);
      res.status(409).json({
        message: "Email in use",
      });
    } else {
      const newUser = await User.create({ email, password: hashPassword });
      res.status(201).json({
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = registerUser;

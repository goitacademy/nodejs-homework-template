const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email is already use",
    });
  }
  const hashpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({ email, password: hashpassword });

  res.status(201).json({
    status: "Created",
    ResponseBody: {
      user: {
        newUser,
        subscription: "starter",
      },
    },
  });
};
module.exports = register;

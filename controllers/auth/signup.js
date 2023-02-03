const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "conflict",
      code: 409,
      message: "Email in use",
    });
    return;
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    subscription,
  });

  res.status(201).json({
    status: "created",
    code: 201,
    message: `New user ${email}`,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;

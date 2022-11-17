const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email: ${email} already exist`);
  }
  const avatarUrl = gravatar.url(email);
  console.log(email);
  console.log(avatarUrl);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: result.name,
        email: result.email,
      },
    },
  });
};

module.exports = register;

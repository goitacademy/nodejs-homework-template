const { User } = require("../../models/users");
// const { user } = require("../../routes/api/signup");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { password, email } = req.body;

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // Пофиксить повторную регистрацию пользователя-------

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: {
      email,
      password,
    },
  });
};

module.exports = register;

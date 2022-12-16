const { User } = require("../../models/users");
// const { user } = require("../../routes/api/signup");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { password, email } = req.body;

  // Пофиксить повторную регистрацию пользователя-------

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }
  await User.create({ email, password });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: {
      email,
    },
  });
};

module.exports = register;

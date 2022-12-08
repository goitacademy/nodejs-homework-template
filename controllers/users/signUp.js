const { User } = require("../../models/user");
const createError = require("http-errors");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const newUser = new User({ name, email, password });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = signUp;

const { User } = require("../../models/users");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = register;

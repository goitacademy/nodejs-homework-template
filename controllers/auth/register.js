const { User } = require("../../models/");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }

  const newUser = new User({ email, subscription });

  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    Status: "created",
    ResponseBody: { user: email, subscription },
  });
};

module.exports = register;

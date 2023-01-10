const { User } = require("../../models/");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, subscription, avatarURL });

  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    Status: "created",
    ResponseBody: { user: email, subscription, avatarURL },
  });
};

module.exports = register;

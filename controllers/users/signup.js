const { User } = require("../../model/users");
const gravatar = require("gravatar");
const { makeHashPass } = require("../../hashpas/hashPassword");
const { Conflict } = require("http-errors");
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPass = makeHashPass(password);
  await User.create({ name, email, password: hashPass, avatarURL });
  res.status(201).json({
    status: "succsess",
    user: {
      name,
      email,
      avatarURL,
    },
  });
};

module.exports = signup;

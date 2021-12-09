const User = require("../../model/users");

const { makeHashPass } = require("../../hashpas/hashPassword");
const { Conflict } = require("http-errors");
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPass = makeHashPass(password);
  await User.create({ name, email, password: hashPass });
  res.status(201).json({
    status: "succsess",
    user: {
      email,
    },
  });
};

module.exports = signup;

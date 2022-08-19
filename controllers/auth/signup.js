const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { basedir } = global;

const { User } = require(`${basedir}/models`);

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        name: result.name,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = signup;

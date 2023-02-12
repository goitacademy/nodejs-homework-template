const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with this email:${email} already registered`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ subscription, email, password: hashPassword});

  res.status(201).json({
    status: 'Created',
    code: 201,
    ResponseBody: {
        user: {
            email,
            subscription
        }
    }
  })
};

module.exports = signup;

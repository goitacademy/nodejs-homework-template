const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcript = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User wish ${email} already exist`);
  }
  const hashPassword = bcript.hashSync(password, bcript.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
  return result;
};

module.exports = register;

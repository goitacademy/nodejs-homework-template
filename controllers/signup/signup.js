const { User } = require("../../models/users");
// const { user } = require("../../routes/api/signup");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }
  const result = await User.create({ name, email, password });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = register;

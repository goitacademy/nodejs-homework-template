const { User } = require("../../models");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  // 1) способ хешировать password регістр
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // const result = await User.create({ email, password: hashPassword });

    // 2) способ хешировать password ругістр
  const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      user: {
        email,
      },
    },
  });
};
module.exports = register;

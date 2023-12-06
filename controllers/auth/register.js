const createPassword = require("../../hash/app");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;

  const hashPassword = await createPassword(password);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  console.log("newUser", newUser);
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = register;

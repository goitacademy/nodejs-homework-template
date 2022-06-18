const { User, joiRegistrationShema } = require("../../models/user");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const validstion = joiRegistrationShema({ email, password });
  if (validstion.error) {
    return res.json(validstion.error.message);
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  return res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = { registerUser };

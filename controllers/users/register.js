const bcrypt = require("bcrypt");
const User = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user !== null) {
    return res.status(409).send({ massage: "Email in use" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, password: passwordHash });
  res.status(201).send({
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};

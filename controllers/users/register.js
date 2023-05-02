const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // хешуємо пароль npm i bcryptjs

  const newUser = await User.create({ ...req.body, password: hashPassword });

<<<<<<< HEAD
 res.status(201).json({
=======
return res.status(201).json({
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};

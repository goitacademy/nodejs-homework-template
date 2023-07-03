const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const register = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(user) {
    throw HttpError(409, "Email already in use");
  }

  const hachPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({...req.body, password: hachPassword});
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password
  });
}

module.exports = register;
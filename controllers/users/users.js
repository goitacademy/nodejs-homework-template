
const { HttpError,ctrlWrappe } = require("../../helpers");
const User = require("../../models/user");
const bcrypt = require("bcrypt");



const register = async (req, res, next) => {
  const { email, password } = req.body
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = await User.create({ email, password: hashPassword })

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription
  })  
}
module.exports = register;

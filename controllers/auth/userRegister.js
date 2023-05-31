const User = require("../../models/user")

const register = async (req, res, next) => {
  try {

    const newUser = await User.create(req.body)
  res.status(201).json( {
        user: {
          email: newUser.email,
          subscription: "starter"
        }
      })
    } catch (error) {
    next(error)
    }
}

module.exports = {register}
const {
  signup
} = require('../../model/auth')

const signupController = async (req, res) => {
  const { email, password } = req.body
  const newUser = await signup(email, password)

  res.status(201).json({ newUser })
}

module.exports = {
  signupController
}

const { addUser } = require('../../model/users/index')

const register = async (req, res) => {
  const { email, password } = req.body
  await addUser(email, password)
  res.status(201).json({ message: 'Register success' })
}

module.exports = { register }

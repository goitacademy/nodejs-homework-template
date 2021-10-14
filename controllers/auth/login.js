const { NotFound } = require('http-errors')
const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const login = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user) {
    throw new NotFound(`Email ${email} not found`)
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid password'
    })
  }
}

module.exports = login

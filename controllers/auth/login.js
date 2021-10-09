const { BadRequest } = require('http-errors')
const bcrypt = require('bcryptjs')

const { User } = require('../../models/user')

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new BadRequest('Email or password is wrong')
  }
}

module.exports = login

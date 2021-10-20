const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const { BadRequest, Unauthorized } = require('http-errors') // BadRequest=400, Unauthorized=401
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequest('Bad Request')
  }
  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)
  if (!compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }
  // --------------
  const payload = {
    id: user._id,
  }
  const { SEKRET_KEY } = process.env
  const token = jwt.sign(payload, SEKRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
  })
}

module.exports = login

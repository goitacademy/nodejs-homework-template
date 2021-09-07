const bcrypt = require('bcryptjs')
const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../../model')

const login = async (req, res) => {
  const { email, password } = req.body
  const [user] = await User.find({ email })
  if (!user) {
    throw new BadRequest('Email or password is wrong')
  }
  const compareResult = bcrypt.compareSync(password, user.password)

  if (!compareResult) {
    throw new BadRequest('Email or password is wrong')
  }

  const payload = {
    id: user._id
  }

  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY)

  const updateUser = await User.findByIdAndUpdate(user._id, { token }, { new: true })

  res.json(updateUser)
}

module.exports = login

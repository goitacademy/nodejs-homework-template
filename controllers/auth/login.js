const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong or email not verify')
  }
  const { _id } = user
  const payload = {
    _id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token
    }
  })
}
module.exports = login

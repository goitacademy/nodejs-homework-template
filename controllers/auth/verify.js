const { NotFound } = require('http-errors')
const { User } = require('../../models/user')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verifyToken: verificationToken })
  if (!user) {
    throw new NotFound('Verify error. User not found')
  }
  const { _id } = user
  await User.findByIdAndUpdate(_id, { verifyToken: null, verify: true })
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  })
}

module.exports = verify

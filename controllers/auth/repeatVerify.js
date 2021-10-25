const { BadRequest } = require('http-errors')
const { User } = require('../../models/user')

const repeatVerify = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('Missing required field email')
  }
  const user = await User.findOne({ email })
  console.log('user :>> ', user)
  if (!user.verify) {
    await User.findOneAndUpdate(user.verifyToken, { verifyToken: null, verify: true })
  } else {
    throw new BadRequest('Verification has already been passed')
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  })
}

module.exports = repeatVerify

const { NotFound } = require('http-errors')

const { User } = require('../../models')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  console.log('*verify verificationToken:', verificationToken)
  const user = await User.findOne({ verificationToken }) // шукаємо чи є такий user по параметру verificationToken
  console.log('*verify user:', user)
  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })
  res.send('<h2>Email confirmed</h2>')
}

module.exports = verify

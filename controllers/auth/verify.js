const { NotFound } = require('http-errors')
const { User } = require('../../models')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('Пользователь не найден')
  }
  await User.findOneAndUpdate(
    user._id, {
      verifyToken: null,
      verify: true
    })
  res.send('<h2>Email подтверждён</h2>')
}

module.exports = verify

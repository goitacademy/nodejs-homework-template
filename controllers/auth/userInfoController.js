const { getUserInfo } = require('../../model/users')

const userInfoController = async (req, res) => {
  const user = await getUserInfo(req.user)
  res.status(200).json({ message: 'success', user: user.email, subscription: user.subscription })
}

module.exports = { userInfoController }

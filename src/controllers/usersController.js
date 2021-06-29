const {
  signup,
  login,
  logout,
  checkCurrentUser,
  switchSubscription
} = require('../services/usersService')

const { ValidationError } = require('../helpers/errors')

const signupController = async (req, res) => {
  const { password, email, subscription } = req.body
  await signup({ password, email, subscription })
  res.json({ status: "success", user: {email, subscription} })
}

const loginController = async (req, res) => {
  const { password, email} = req.body
  const {token, user} = await login({ password, email })
  res.json({ status: "success", token, user })
}

const logoutController = async (req, res) => {
  const { userId } = req
  await logout(userId)
  res.status(204).json({ status: "success" })
}

const currentUserController = async (req, res) => {
  const { authorization } = req.headers
  const user = await checkCurrentUser(authorization);
  res.json({ status: "success", user })
}

const switchSubscriptionController = async (req, res) => {
  const { email, subscription } = req.body
  const availableSubscription = ['starter', 'pro', 'business']
  if (!availableSubscription.includes(subscription)) {
    throw new ValidationError('Not available subscription type')
  }
  await switchSubscription({ email, subscription })
  res.json({ status: "success" })
}

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  switchSubscriptionController
}
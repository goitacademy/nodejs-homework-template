const Users = require('../services/usersServices')
const Auth = require('../services/authServices')

const { NotAuthorizedError } = require('../helpers/errors')

const signUp = async (req, res) => {
  const user = await Users.getUserByEmail(req.body.email)

  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }

  const { email, subscription } = await Users.addUser(req.body)
  res.status(201).json({ user: { email, subscription } })
}

const logIn = async (req, res, next) => {
  const token = await Auth.login(req.body)

  if (token) {
    const { email, subscription } = await Users.getUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription } })
  }
  next(new NotAuthorizedError('Email or password is wrong'))
}

const logOut = async (req, res, next) => {
  await Auth.logout(req.user.id)
  // res.status(200).json({ message: 'No Content!' })
  res.status(204)
}

const currentUser = async (req, res, next) => {
  const currentUser = await Users.getUserById(req.user.id)

  if (!currentUser) {
    next(new NotAuthorizedError('Email or password is wrong'))
  }
  const { email, subscription } = currentUser
  res.status(200).json({ email, subscription })
}

const patchSubscription = async (req, res, next) => {
  const currentUser = await Users.getUserById(req.user.id)
  if (!currentUser) {
    next(new NotAuthorizedError('Email or password is wrong'))
  }
  await Users.userUpdateSubscription(currentUser.id, req.body.subscription)
  const { email, subscription } = await Users.getUserById(req.user.id)
  res.status(200).json({ email, subscription })
}

module.exports = { signUp, logIn, logOut, currentUser, patchSubscription }

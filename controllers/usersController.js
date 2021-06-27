const Users = require('../services/usersServices')
const Auth = require('../services/authServices')

const signUp = async (req, res) => {
  const user = await Users.getUserByEmail(req.body.email)

  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }

  const { email, subscription } = await Users.addUser(req.body)
  res.status(201).json({ user: { email, subscription } })
}

const logIn = async (req, res) => {
  const token = await Auth.login(req.body)

  if (token) {
    const { email, subscription } = await Users.getUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription } })
  }

  res.status(401).json({ message: 'Email or password is wrong' })
}

const logOut = async (req, res, next) => {
  await Auth.logout(req.user.id)
  res.status(200).json({ message: 'No Content!' })
  // res.status(204).json({ message: 'No Content!' })
}

const currentUser = async (req, res) => {
  const currentUser = await Users.getUserById(req.user.id)

  if (currentUser) {
    const { email, subscription } = currentUser
    res.status(200).json({ email, subscription })
  }
}

module.exports = { signUp, logIn, logOut, currentUser }

// const userUpdateSubscription = async (req, res, next) => {
//   const { email } = req.params
//   const { body } = req
//   const { error } = userUpdateSubscriptionSchema.validate(req.body)
//   if (error) {
//     throw new WrongParametersError('missing field favorite')
//   }
//   try {
//     const user = await Users.updateContact(email, body)

//     if (user) {
//       return res.status(200).json({ user, status: 'success' })
//     }
//   } catch (error) {
//     next(error)
//   }
// }

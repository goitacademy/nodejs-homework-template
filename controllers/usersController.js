const Users = require('../services/usersServices')
const { WrongParametersError } = require('../helpers/errors')

const {
  addUserSchema,
  userUpdateSubscriptionSchema
} = require('../routes/api/userValidation')

const userSignup = async (req, res, next) => {
  const { error } = addUserSchema.validate(req.body)
  if (error) {
    throw new WrongParametersError('missing required field')
  }
  try {
    const user = await Users.addUser(req.body)
    res.status(201).json({ user, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const userLogin = async (req, res, next) => {}
const userLogout = async (req, res, next) => {}
const userCurrent = async (req, res, next) => {}

const userUpdateSubscription = async (req, res, next) => {
  const { email } = req.params
  const { body } = req
  const { error } = userUpdateSubscriptionSchema.validate(req.body)
  if (error) {
    throw new WrongParametersError('missing field favorite')
  }
  try {
    const user = await Users.updateContact(email, body)

    if (user) {
      return res.status(200).json({ user, status: 'success' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
  userUpdateSubscription
}

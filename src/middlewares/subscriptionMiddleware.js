const { User } = require('../db/userModel')
const { WrongParametersError } = require('../helpers/errors')

const subscriptionCheckMiddleware = async (req, res, next) => {
  const { subscription } = req.body
  const { _id } = req.user

  const user = await User.findById({ _id })

  switch (subscription) {
    case 'starter':
      user.subscription = 'starter'
      await user.save()
      next()
      break
    case 'pro':
      user.subscription = 'pro'
      await user.save()
      next()
      break
    case 'business':
      user.subscription = 'business'
      await user.save()
      next()
      break
    default:
      next(new WrongParametersError('Please, provide valid subscription type'))
  }
}

module.exports = {
  subscriptionCheckMiddleware,
}

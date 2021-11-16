const { UserModel } = require('../../db/userModel')
const { BadRequest } = require('http-errors')

const patchUser = async (userId, subscriptionType) => {
  if (subscriptionType !== 'starter' && subscriptionType !== 'pro' && subscriptionType !== 'business') {
    throw new BadRequest('Choose from starter, pro, business subscription types')
  }
  const patched = await UserModel.findByIdAndUpdate(userId, { subscription: subscriptionType })
  return patched
}

module.exports = {
  patchUser
}

const { User } = require('../../db/userModel')

const updateUserSubscription = async (id, body) => {
  const updateContact = await User.findByIdAndUpdate(id, { $set: body })
  return updateContact
}

module.exports = { updateUserSubscription }

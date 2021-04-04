//const jwt = require('jsonwebtoken');

const User = require('../schemas/userSchema')

const findById = async id => {
  const user = await User.findById(id)/*{_id: id}*/
  return user

}
const findByEmail = async email => {
    const user = await User.findOne({email})
    return user
  }

  const createNewUser = async ({email, password, subscription, token}) => {
      const user = await new User({email, password, subscription, token}).save()
      return user
  }
  const updateToken = async (id, token) => {
     const user = await User.updateOne({_id: id}, {token})
    return user
  }
  const updateUser = async (id, subscription) => {
    const user = User.findByIdAndUpdate({ _id: id}, {subscription}, { new: true })
    return user
  }

  module.exports = {
    findById,
    findByEmail,
    createNewUser,
    updateToken,
    updateUser
  }
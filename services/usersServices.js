const Users = require('../model/user/schemaUser')

const addUser = ({ email, password }) => {
  return Users.create({ email, password })
}

const getCurrentUser = (email, token) => {
  return Users.findOne({ email: email, token: token })
}

const userUpdateSubscription = (email, body) => {
  return Users.findOneAndUpdate({ email: email }, body, { new: true })
}

module.exports = {
  addUser,
  getCurrentUser,
  userUpdateSubscription
}

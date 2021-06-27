const Users = require('../model/schemaUser')

const getUserById = (id) => {
  return Users.findById({ _id: id })
}

const getUserByEmail = (email) => {
  return Users.findOne({ email })
}

const addUser = (body) => {
  const user = Users(body)
  return user.save()
}

const updateToken = (id, token) => {
  Users.updateOne({ _id: id }, { token })
}

// const userUpdateSubscription = (email, body) => {
//   return Users.findOneAndUpdate({ email: email }, body, { new: true })
// }

module.exports = {
  getUserById,
  getUserByEmail,
  addUser,
  updateToken
  // getCurrentUser,
  // userUpdateSubscription
}

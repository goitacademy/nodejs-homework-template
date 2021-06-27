const Users = require('../model/schemaUser')

const getUserById = async (id) => {
  return await Users.findById(id)
}

const getUserByEmail = async (email) => {
  return await Users.findOne({ email })
}

const addUser = async (body) => {
  const user = await Users(body)
  return user.save()
}

const updateToken = async (id, token) => {
  await Users.updateOne({ _id: id }, { token })
}

// const userUpdateSubscription = (id, subscription) => {
//   return Users.updateOne({ id: id }, subscription)
// }

module.exports = {
  getUserById,
  getUserByEmail,
  addUser,
  updateToken
  // getCurrentUser,
  // userUpdateSubscription
}

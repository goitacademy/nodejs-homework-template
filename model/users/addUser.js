const { User } = require('../../db/userModel')

const addUser = async (email, password) => {
  const user = new User({ email, password })
  await user.save()
}

module.exports = { addUser }

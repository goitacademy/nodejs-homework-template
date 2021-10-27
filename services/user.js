const User = require("../utils/userSchema")

const getOne = (data) => {
  return User.findOne(data)
}

const getById = (id) => User.findById(id)

const addUser = ({ email, password, avatarUrl, verifyToken }) => {
  console.log(`avatarURL: ${avatarUrl}`)
  const newUser = new User({ email, avatarUrl, verifyToken })
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = (id, dataToUpdate) => {
  return User.findByIdAndUpdate(id, dataToUpdate)
}

module.exports = {
  getById,
  getOne,
  addUser,
  updateById,
}

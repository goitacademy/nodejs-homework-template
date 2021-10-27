const User = require("../utils/userSchema")

const getOne = (data) => {
  return User.findOne(data)
}

const getById = (id) => User.findById(id)


const addUser = ({ email, password, avatarUrl }) => {
  console.log(`avatarURL: ${avatarUrl}`)
  const newUser = new User({ email, avatarUrl })
=======
const addUser = ({ email, password }) => {
  const newUser = new User({ email })

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

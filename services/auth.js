const User = require('../model/user.model')

const getOne = (filter) => {
  return User.findOne(filter)
}

const addUser = ({ email, password }) => {
  const newUser = new User({ email })
  newUser.setPassword(password)
  return newUser.save()
}

module.exports = {
  getOne,
  addUser
}

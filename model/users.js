const User = require('./schemas/user')

// === FIND user "email" ===
const findByEmail = async email => {
  return await User.findOne({ email })
}

// === FIND user "id" ===
const findById = async id => {
  return await User.findOne({ _id: id })
}

// === FIND user "token" ===
const findByToken = async token => {
  return await User.findOne({ token })
}

// === CREATE user ===
const create = async ({ name, email, password, subscription }) => {
  const user = new User({ name, email, password, subscription })

  return await user.save()
}

// === UPDATE token  ===
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findByEmail,
  findById,
  findByToken,
  create,
  updateToken,
}

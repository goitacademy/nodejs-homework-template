const User = require('./shemas/user');

const findById = async(id)=> {
  return await User.findOne({_id:id})
}

const findByEmail = async (email) => {
  return await User.findOne({email})
}

const create = async (userOptions) => {
  const user = new User(userOptions)
  return await user.save()
}
const updateToken = async (id, token) => {
  return await User.updateOne({_id:id},{token} )
}

const findByToken = async (token) => await User.findOne({ token })

module.exports = {
  findById,
  findByEmail,
  findByToken,
  create,
  updateToken
}
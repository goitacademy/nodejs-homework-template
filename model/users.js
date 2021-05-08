const User = require('./shemas/user');

const findById = async(id)=>  await User.findOne({_id:id})

const findByEmail = async (email) =>  await User.findOne({email})

const create = async (userOptions) => {
  const user = new User(userOptions)
  return await user.save()
}
const updateToken = async (id, token) =>  await User.updateOne({_id:id},{token})

// const updateUserAvatar = async (id, avatar) => await User.updateOne({_id:id},{avatar})
const updateUserAvatar = async (id, avatarUrl) => await User.updateOne({_id:id},{avatarUrl})

const findByToken = async (token) => await User.findOne({ token })

module.exports = {
  findById,
  findByEmail,
  findByToken,
  create,
  updateToken,
  updateUserAvatar,
}
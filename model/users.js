const Users = require('./schemas/usersSchema')

const findUserById = async (userId) => {
    return await Users.findById(userId)
}

const findUserByEmail = async (email) => {
    return await Users.findOne({email})
}

const createUser = async (userOptions) => {
    const user = new Users(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await Users.findByIdAndUpdate(id, { token })
}

const updateSubscription = async (id, subscription ) => {
    return await Users.findByIdAndUpdate(id, { subscription }, { new: true })
}
const updateAvatar = async (id, avatarURL, idCloudAvatar = null) => {
    return await Users.findByIdAndUpdate( id, { avatarURL, idCloudAvatar }, { new: true })
}

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar
}
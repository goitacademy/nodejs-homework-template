const User = require('./schemas/user')

const findById = async (id) => {
    return await User.findOne({ _id: id })
}

const findByEmail = async (email) => {
    return await User.findOne({ email })
}

const createUser = async (userOptions) => {
    const user = new User(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token })
}

const updateSubscription  = async (userId, body) => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { ...body },
    { new: true }
  )
  return result
}

// For static
const updateAvatar = async (id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar })
}

// For cloudinary
// const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
//     return await User.updateOne({ _id: id }, { avatar, idCloudAvatar })
// }

module.exports = {
    findById,
    findByEmail,
    createUser,
    updateToken,
    updateSubscription,
    updateAvatar,
}
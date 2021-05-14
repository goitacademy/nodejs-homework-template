const { User, users } = require('./data')

const findById = jest.fn((id) => {
    const [user] = users.filter((el) => String(el._id) === String(id))
    return user
})

const findByEmail = jest.fn((email) => {
    return {}
})

const createUser = jest.fn((userOptions) => {
    return {}
})

const updateToken = jest.fn((id, token) => {
    const [user] = users.filter((el) => String(el._id) === String(id))
    user.avatar = avatar
    user.idCloudAvatar = idCloudAvatar
    return user
})

const updateSubscription  = jest.fn((userId, body) => {
  return {}
})

// For static
const updateAvatar = jest.fn((id, avatar) => {
    return {}
})

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
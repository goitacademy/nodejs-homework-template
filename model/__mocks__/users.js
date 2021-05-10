const {User, users}= require('./data');

const findById = jest.fn((id) => {
    const [user] = users.filter(el => String(el._id) === String(id))
    return user
})


const findByEmail = jest.fn((email) => {
    return {}
})

const create = jest.fn((userOptions) => {
    return {}
})
const updateToken = jest.fn((id, token) => {
    return {}
})

const updateUserAvatar = jest.fn((id, avatarUrl, idCloudAvatar = null) => {
    const [user] = users.filter(el => String(el._id) === String(id))
    user.avatar = avatarUrl;
    user.idCloudAvatar = idCloudAvatar;
    return user
})

const findByToken = jest.fn((token) => {
    return {}
})

module.exports = {
    findById,
    findByEmail,
    findByToken,
    create,
    updateToken,
    updateUserAvatar,
}
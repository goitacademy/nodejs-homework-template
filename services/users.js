const User = require('../models')

const getOne = (filter) => {
    return User.findOne(filter)
}

const getById = (id) => {
    return User.findById(id)
}

const add = ({ email, password }) => {
    const newUser = new User({ email })
    newUser.setPassword(password)
    return newUser.save()
}

const update = (id, token) => {
    return User.findByIdAndUpdate(id, token)
}

const updateToken = (id, token) => {
    return User.findByIdAndUpdate(id, token)
}

const getAvatar = (id) => {
    const { idCloudAvatar, avatarURL } = User.findOne(id)
    return { idCloudAvatar, avatarURL }
}

const updateAvatar = (id, idCloudAvatar, avatarURL) => {
    return User.findByIdAndUpdate(id, { idCloudAvatar, avatarURL })
}

module.exports = {
    getOne,
    getById,
    add,
    update,
    updateToken,
    getAvatar,
    updateAvatar
}

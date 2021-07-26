const User = require('../models')
const { nanoid } = require('nanoid')
const sendVerificationEmail = require('../configs/config-mailer')

const getOne = (filter) => {
    return User.findOne(filter)
}

const getById = (id) => {
    return User.findById(id)
}

const add = ({ email, password }) => {
    const verifyToken = nanoid()
    sendVerificationEmail({ email, verifyToken })
    const newUser = new User({ email, verifyToken })
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

const verify = (verifyToken) => {
    const tokenData = User.findOne(verifyToken)
    if (tokenData) {
        tokenData.updateOne({ verify: true, verifyToken: null })
        return true
    }
    return false
}

module.exports = {
    getOne,
    getById,
    add,
    update,
    updateToken,
    getAvatar,
    updateAvatar,
    verify
}

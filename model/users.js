const User = require('./schemas/user.js')

const findByEmail = async (email) => {
    return await User.findOne({ email: email })
}

const findById = async (id) => {
    return await User.findOne({ _id: id })
}
const create = async (body) => {
    return await User.create(body)
}

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token: token })
}

module.exports = {
    findByEmail,
    create,
    updateToken,
    findById
}
const User = require('./schemas/user')


const findById = async (id) => {
    return await User.findOne({ _id: id })
}

const findEmail = async (email) => {
    return await User.findOne({ email })
}

const createUser = async (userOptions) => {
    const user = new User(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id}, {token})
}

module.exports = {
    findById,
    findEmail,
    createUser,
    updateToken,
}
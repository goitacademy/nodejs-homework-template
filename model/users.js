const User = require('./shemas/user')

const findUserById = async (id) => {
    return await User.findByEmail({_id: id})
}

const findUserByEmail = async (email) => {
    return await User.findByEmail({email})
}

const addUser = async (userOptions) => {
    const user = new User (userOptions)
    return await user.save()
}

const updateUserToken = async (id, token) => {
    return await User.updateOne({_id: id}, {token})
}

module.exports = {
    findUserById,
    findUserByEmail,
    addUser,
    updateUserToken
}
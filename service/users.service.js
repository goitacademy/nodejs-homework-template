const Users = require('./schemas/users')

const getUserByEmail = async (email) => {
    return Users.findOne({ email: email })
}

const getUserById = async (id) => {
    return Users.findById(id)
}

const createUser = async (fields) => {
    return Users.create(fields)
}

const updateUser = async (id, fields) => {
    return Users.findByIdAndUpdate(id, fields)
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser
}

const User = require('./Schemas/user')

const findByEmail = async (email) => {
    return await User.findOne({ email })
}

const findById = async (id) => {
    return await User.findOne({ _id: id })
}

const create = async ({ name, email, password, sex }) => {
    const user = new User({ name, email, password, sex })
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token })
}

module.exports = {
    findByEmail,
    findById,
    create,
    updateToken,
}

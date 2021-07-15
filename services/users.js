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

const update = (id, data) => {
    return User.findByIdAndUpdate(id, data)
}

const updateAvatar = (id, avatar) => {
    return User.updateOne({ _id: id }, { avatar })
}

module.exports = {
    getOne,
    getById,
    add,
    update,
    updateAvatar
}

const path = require('path')
const fs = require('fs/promises')

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

const updateAvatar = async (id, file) => {
    const { path: tempPath, originalname } = file
    const extension = originalname.split('.').pop()
    const filename = `${id}_avatar-image.${extension}`
    const uploadPath = path.join(__dirname, '../', 'public/avatars', filename)
    const filePath = path.join('avatars', filename)

    await fs.rename(tempPath, uploadPath)

    return filePath
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    updateAvatar,
}

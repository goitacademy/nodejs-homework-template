const User = require('../../models/schemas/users')

/**
 * 
 * @param {string} verificationToken 
 * @returns генерує verificationToken для email
 */
const findByVerifyToken = async verificationToken => {
    return await User.findOne({ verificationToken })
}

module.exports = findByVerifyToken
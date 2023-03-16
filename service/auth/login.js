const User = require('../../schemas/auth')
const AutorizedError = require('../../helpers/AutorizedError')

const login = ({ name, email, phone, favorite = false }) => {
    return User.create({ name, email, phone, favorite })
}

module.exports = login
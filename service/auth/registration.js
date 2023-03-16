const User = require('../../schemas/auth')
const AutorizedError = require('../../helpers/AutorizedError')


const registration = async ({ email, password }) => {
    const user = new User({
        email,
        password,
    })

    await user.save();
}

module.exports = registration
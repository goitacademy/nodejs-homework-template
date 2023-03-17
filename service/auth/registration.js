const User = require('../../models/auth')



const registration = async (email, password) => {
    const user = new User({
        email,
        password
    })

    await user.save();
}

module.exports = registration
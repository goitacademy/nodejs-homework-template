const User = require('../../models/auth')


const logOutUser = async (_id) => {
    await User.findByIdAndUpdate(_id, { token: null })


}

module.exports = logOutUser
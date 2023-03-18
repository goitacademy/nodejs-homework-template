const User = require('../../models/auth')
const { NotEniqueMailError } = require('../../helpers/errors')


const registration = async (email, password) => {
    const userCheck = await User.findOne({ email });

    if (userCheck) {
        throw new NotEniqueMailError('Email in use')
    } else {
        const user = new User({
            email,
            password
        })

        await user.save();
    }




}

module.exports = registration
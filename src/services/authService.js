const { User } = require('../db/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registration = async ({email, password}) => {
    try {
        const user = new User({ email, password })
        await user.save();
        return user
    } catch (error) {
        console.log(error.message)
    }
}

const login = async ({email, password}) => {
    try {
        const user = await User.findOne({ email })
    
        if (!user) {
            //  `no user with email '${email} found`
            // return "wrong email"
            return null
        }

        if (!await bcrypt.compare(password, user.password)) {
            // "message": "Email or password is wrong"
            // return "wrong password"
            return null
        }

        const token = jwt.sign({
            _id: user._id,
        }, process.env.JWT_SECRET)
        return {token, user}
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registration,
    login
}
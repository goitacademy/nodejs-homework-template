const { User } = require('../db/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registration = async ({email, password}) => {
    try {
        const user = new User({ email, password })
        await user.save();
        console.log("user: ", user)
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
        await User.findOneAndUpdate(user._id, { $set: {token: token} },)

        return {token, user}
    } catch (error) {
        console.log(error)
    }
}

const logout = async (id) => {
    try {
        const user = await User.findByIdAndUpdate(id, {$set: {token: null}})
    
        if (!user) {
            return null
        }

        return user
    } catch (error) {
        console.log(error)
    }
}

const getCurrentUser = async (id) => {
    try {
        const user = await User.findById(id, {email: 1, subscription: 1, _id: 0 } )
        if (!user) {
            return null
        }
        return user
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    registration,
    login,
    logout,
    getCurrentUser
}
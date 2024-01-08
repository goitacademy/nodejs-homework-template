const bcrypt = require('bcryptjs')

const User = require('../../models/user')
const { RequestError } = require('../../helpers')

const register = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body
        const user = await User.findOne({ email })
        if (user) {
            throw RequestError(409, '"Email in use"')
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ email, password: hashPassword, subscription })
        
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription
        }})
        
    } catch (error) {
        next(error)
    }
 };

module.exports = register
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../../models/user')
const { RequestError } = require('../../helpers')
const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw RequestError(401, "Email is wrong")
        } else {
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                throw RequestError(401, "Password is wrong")
            }
        } 
        
        const payload = {
            id: user._id,
        }
        const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        await User.findByIdAndUpdate(user._id, { token })

        res.json({
            token: token,
            user: {
                email: user.email,
                subscription: user.subscription
            }
})

    } catch (error) {
        next(error)
    }
 }

module.exports = login
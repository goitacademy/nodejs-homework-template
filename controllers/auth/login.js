const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models/user')
const { RequestError } = require('../../helpers/Errors')


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user)
        { throw RequestError('Email or password is wrong', 401) }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
        { throw RequestError('Email or password is wrong', 401) }

        const token = jwt.sign({
            id: user._id,
            createdAt: user.createdAt,
        }, process.env.JWT_SECRET)

        res.status(200).json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription
            }
        })

        
    }
    catch (error) {
        next(error)
    }
}

module.exports = login;

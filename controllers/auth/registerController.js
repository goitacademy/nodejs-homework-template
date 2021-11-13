const { User } = require('../../model')
const { Conflict } = require('http-errors')
const bcript = require('bcryptjs')

// 
const registerController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
          throw new Conflict({message: "Email in use"})
        }
        const hashPassword = bcript.hashSync(password, bcript.genSaltSync(10))

        const newUser = await User.create({ email, password: hashPassword})
        res.status(201).json({
            status: 'Created',
            code: 201,
            data: {
                user: {
                email,
                 subscription: "starter"
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = registerController
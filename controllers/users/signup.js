const bcrypt = require('bcryptjs')

const{User, schemas} = require("../../models/users")
const createError = require('../../middleware/createError')

const signup = async(req, res) => {
    const {error} = schemas.register.validate(req.body)

    if(error) {
        throw createError(400, error.message)
    }

    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user) {
        throw createError(409, `Email ${email} in use`)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const reply = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
        email: reply.email,
    })
}

module.exports = signup;
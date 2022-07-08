const { User } = require("../../models/user")
const { createError } = require("../../helpers")

const register = async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if (user) {
        throw createError(409, "Email in use")
    }

    const result = User.create(req.body)

    res.status(201).json({
        user: {
            email: result.email,
            name: result.name,
        }
    })
}

module.exports = register
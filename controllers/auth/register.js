const { User } = require("../../models/user")
const {createError} = require("../../helpers")

const register = async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if (user) {
        throw createError(409, "Email in use")
    }

    await User.create(req.body)
    res.status(201).json({
        message: "success added"
    })
}

module.exports = register
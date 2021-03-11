const Users = require('../model/users')
const { httpCode } = require('../model/helpers/constants')
require('dotenv').config()

const currentUser = async (req, res) => {
    const id = req.user.id
    const user = await Users.findById(id)
    if (!user) {
        return res.status(httpCode.NOTFOUND).json({
            message: "Not authorized"
        })
    }
    return res.status(httpCode.OK).json({
        email: user.email,
        subscription: user.subscription
    })
}

module.exports = {
    currentUser
}
const {Users} = require('../../models/user')
const { RequestError } = require('../../helpers/Errors')

const register = async (req, res) => {
    const { name, email, password } = req.body
    const user = await Users.findByOne(email)
    if (user) {
        throw RequestError('Email in use', 409)
    }
    const newUser = await Users.create({ name, email, password })
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}
    
module.exports = register
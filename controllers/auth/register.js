const bcrypt = require('bcryptjs')


const {User} = require('../../models/user')
const {RequestError} = require('../../heplers')



const register = async(req, res) => {

    const {email, password, subscribtion} = req.body
    const user = await User.findOne({email})
    if(user) {
        throw RequestError(409, 'Email in use')

    }

    const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({email, password: hashPassword, subscribtion})
    res.status(201).json({
        email: result.email,
        subscribtion: result.subscribtion,
    })
}



module.exports = register
const User = require('../../models/user')
const requestError = require ('../../helpers/requestError')
const bcrypt = require('bcrypt')

const registration = async (req, res, next) => { 
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const { email } = req.body;
    const userInBase = await User.findOne({email});
    if (userInBase) {
        throw requestError(409, "Email in use")
    }
    const user = await User.create(req.body)
    res.status(201).json(user)  
}

module.exports = registration
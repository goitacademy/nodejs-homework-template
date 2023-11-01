const User = require('../../models/user')
const requestError = require ('../../helpers/requestError')
const bcrypt = require('bcrypt')
require("dotenv").config();
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => { 
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        throw requestError(401, "Email or password is wrong")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch ) {
        throw requestError(401, "Email or password is wrong")
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1 day' })
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json(token)
}

module.exports = login
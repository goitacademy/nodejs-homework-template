const { HttpError } = require('../helpers/HttpError')
const ctrlWrapper = require('../helpers/CtrlWrapper')
const bcrypt = require("bcrypt")
const { User } = require('../models/user')
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ ...req.body, password: hashPassword })
    console.log(newUser)
    res.status(201).json({
        email: newUser.email,
        password: newUser.password
    }
    )
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id:user._id
    }
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    await User.findByIdAndUpdate(user._id, { token })
    
     const userRes = {
        email: user.email,
        subscription: user.subscription
     };

    res.json({ token, user: userRes})

}

const logout = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    
    const id = user._id 
    // console.log(id)
    try {
        await User.findByIdAndUpdate(user._id, { token: null })
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

const currentUser = async (req, res, next) => {
    try {
    const { token } = req.body

    const user = await User.findOne({ token })

        if (!user) {
            throw HttpError(401, "Not authorized");
        }

    res.status(200).json({
            email: user.email,
            subscription: user.subscription
    });
        
    } catch (e) {
        next(e)
    }
    
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    currentUser: ctrlWrapper(currentUser)
}
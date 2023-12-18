const { User } = require("../models/User")
const { ctrlWrapper, HttpError } = require('../helpers')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env

const register = async (req, res) => {

    const { email, password} = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hashSync(password, 10)

    const newUser = await User.create({ ...req.body, password: hashPassword })
   

    res.status(201).json({
        "user": {
            "email": newUser.email,
            "subscription": newUser.subscription
        }
    })
}

const login = async (req, res) => {
    const { email, password, id} = req.body
    const user = await User.findOne({ email })
    
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

     const passwordCompare = await bcrypt.compare(password, user.password)
    
    
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    
     const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" })
    await User.findByIdAndUpdate(user._id, { token })

         res.status(200).json({
        "token": token,
        "user": {
            "email": user.email,
            "subscription": user.subscription
        }
    })   
}

const current = async (req, res) => {
    if (!req || !req.user) {
        throw HttpError(401, "Not authorized")
    }

    res.status(200).json({
        "email": req.user.email,
        "subscription": req.user.subscription
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate({ _id }, { token:"" })

    res.status(204).json({ message: "No Content" })
}

const updateSubscription = async (req, res, next) => {
    if (!req || !req.user) {
        throw HttpError(401, "Not authorized")
    }
    const data = await User.findByIdAndUpdate(req.user._id, req.body, {new: true })
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    res.json({"email": data.email,
        "subscription": data.subscription})
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
}
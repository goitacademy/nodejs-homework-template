const { HttpError } = require('../helpers/HttpError')
const ctrlWrapper = require('../helpers/CtrlWrapper')
const bcrypt = require("bcrypt")

const gravatar = require("gravatar")

const path = require("path")

const fs =  require("fs/promises")

const { User } = require('../models/user')
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env

const avatarsDir = path.join(__dirname, "../", "public", "avatars")

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email)

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL })
    // console.log(newUser)
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
    // const { email } = req.body
    
    try {
        const authHeader = req.headers.authorization; 
        const token = authHeader.split(' ')[1];
        
        // console.log('token:', token)

        if (!token) {
        throw HttpError(401, "Not authorized");
        }

        const user = await User.findOne({ token })
        
        // console.log('user', user)

        if (!user) {
            return res.status(401).json({ error: "Not authorized" });
        }

        await User.findByIdAndUpdate(user._id, { token: null })
       
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

const currentUser = async (req, res, next) => {
    try {
        // const { token } = req.body
        const authHeader = req.headers.authorization; 
        const token = authHeader.split(' ')[1];
        // console.log(token)
    if (!token) {
        throw HttpError(401, "Not authorized");
    }
        
    const user = await User.findOne({ token })
        console.log(user)
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

const updateAvatar = async (req, res, naxt) => {
    const {_id} = req.user
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join("avatars", filename)
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    currentUser: ctrlWrapper(currentUser),
    updateAvatar: ctrlWrapper(updateAvatar)
}
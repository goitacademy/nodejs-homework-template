const {
    registration,
    login,
    logout,
    getCurrentUser
} = require('../services/authService')

const registrationController = async (req, res) => {
    const newUser = await registration(req.body)

    if (!newUser) {
        return res.status(409).json({"message": "Email in use"})
    }

    const { email, subscription } = newUser
    
    res.status(201).json({
        "user": {
            email,
            subscription
        }
    })
}

const loginController = async (req, res) => {
    const user = await login(req.body)
    if (!user) {
        return res.status(401).json({"message": "Email or password is wrong"})
    }

    const { token, user: { email, subscription } } = user 

    res.json({
        token, 
        "user": {email, subscription}
    })
}

const logoutController = async (req, res) => {
    const user = await logout(req.user._id)
    
    if (!user) {
        return res.status(401).json({"message": "Not authorized"})
    }

    res.sendStatus(204)
}

const getCurrentController = async (req, res) => {
    const user = await getCurrentUser(req.user._id)

    if (!user) {
        return res.status(401).json({"message": "Not authorized"})
    }

    res.json({user})
}
  
module.exports = {
    registrationController,
    loginController,
    logoutController,
    getCurrentController
}
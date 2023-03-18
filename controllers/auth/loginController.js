
const { login } = require('../../service/auth')

const loginController = async (req, res, next) => {
    const { email, password } = req.body

    const token = await login(email, password)

    res.status(200).json({
        token,
        "user": {
            email,
            "subscription": "starter"
        }
    })
}

module.exports = loginController
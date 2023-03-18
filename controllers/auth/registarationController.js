
const { registration } = require('../../service/auth')



const registarationController = async (req, res, next) => {
    const { email, password } = req.body

    await registration(email, password)


    res.status(201).json({
        status: 'created',
        "user": {
            email,
            "subscription": "starter"
        }
    })
}

module.exports = registarationController
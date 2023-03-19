const { getCurrentUser } = require('../../service/auth')


const getUserController = async (req, res, next) => {
    const { _id } = req.user
    const { email, subscription } = await getCurrentUser(_id)

    res.status(200).json({
        "user": {
            email,
            subscription,
        }
    })
}

module.exports = getUserController
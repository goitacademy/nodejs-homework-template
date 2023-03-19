const { logOutUser } = require('../../service/auth')


const logOutUserController = async (req, res, next) => {
    const { _id } = req.user
    await logOutUser(_id)

    res.status(204).json()
}

module.exports = logOutUserController
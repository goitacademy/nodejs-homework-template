const { users: service } = require('../../services')

const logout = async (req, res, next) => {
    const { user } = req
    try {
        await service.updateToken(user._id, { token: null })
        res.status(204).json({
            status: 'success',
            code: 204,
            message: 'Successful logout'
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = logout

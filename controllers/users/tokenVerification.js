const { user: service } = require('../../services')

const tokenVerification = async (req, res, next) => {
    const { verifyToken } = req.params
    try {
        const result = await service.verify({ verifyToken })
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: 'User not found'
            })
            return
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                message: 'Verification successful'
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = tokenVerification

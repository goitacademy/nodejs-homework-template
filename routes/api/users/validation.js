const { httpCode } = require('../../../model/helpers/constants')

module.exports.validateUploadAvatar = (req, res, next) => {
    if (!req.file) {
        return res.status(httpCode.BADREQUEST).json({
            status: 'error',
            httpCode: httpCode.BADREQUEST,
            data: 'bad request',
            message: 'Avatar field not found'
        })
    }
    next()
}
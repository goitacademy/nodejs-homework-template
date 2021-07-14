const { contacts: service } = require('../../services')
const { updateFavoriteSchema } = require('../../utils/validateContactsSchemas')
const mongoose = require('mongoose')

const updateFavorite = async (req, res, next) => {
    const { body } = req
    const { id } = req.params
    try {
        const { error } = updateFavoriteSchema.validate(body)
        if (error) {
            res.status(400).json({
                status: 'error',
                code: 400,
                message: 'missing field favorite'
            })
        }
        const validationContactId = mongoose.isValidObjectId(id)
        if (!validationContactId) {
            return res.status(404).json({
                status: 'error',
                code: 400,
                message: 'Contact id must be a string',
            })
        }
        const result = await service.updateFavorite(id, body)
        if (!result) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not found'
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = updateFavorite

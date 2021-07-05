const { contacts: service } = require('../../services')
const mongoose = require('mongoose')
const { updateContactSchema } = require('../../utils/validateSchemas')

const updateContact = async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    try {
        const { error } = updateContactSchema.validate(body)
        if (error) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Bad request'
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
        const updatedContact = await service.updateContact(id, body)
        res.json({
            status: 'success',
            code: 200,
            data: {
                result: updatedContact
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = updateContact

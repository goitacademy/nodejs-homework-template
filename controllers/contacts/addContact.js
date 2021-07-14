const { contacts: service } = require('../../services')
const { createContactSchema } = require('../../utils/validateContactsSchemas')

const addContact = async (req, res, next) => {
    const { body } = req
    try {
        const { error } = createContactSchema.validate(body)
        if (error) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Bad request'
            })
        }
        const result = await service.createContact(body)
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = addContact

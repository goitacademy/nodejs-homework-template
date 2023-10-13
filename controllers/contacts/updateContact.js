const contactsModel = require('../../models/contacts')
const { handleReqError } = require('../../helpers')
const { bodySchema } = require('../../models/validation/valid-contacts')

/**
 * PUT /api/contacts/:id
 * Отримує параметр id
 * Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
 * @returns якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
 * @returns за результатом роботи функції повертає оновлений об'єкт контакту і статусом 200.
 * @returns в іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
 */
const updateContact = async (req, res, next) => {
    const validContact = bodySchema.validate(req.body)

    if (validContact.error) {
        return res.status(400).json({
            status: validContact.error.details
        })
    }

    const contactId = req.params.contactId
    const body = req.body

    const updateContact = await contactsModel.updateContact(contactId, body)

    if (updateContact) {
        return res.status(200).json({
            status: "success",
            code: 200,
            data: updateContact,
        })
    } else {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }
}

module.exports = handleReqError(updateContact) 
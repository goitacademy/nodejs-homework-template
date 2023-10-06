const contactsModel = require('../../models/contacts')
const { handleReqError } = require('../../helpers')
const { bodySchema } = require('../../routes/api/validation')

/**
 * PATCH /api / contacts /:id/ favorite
 * Отримує body в json-форматі c оновленням поля favorite
 * @returns якщо body немає, повертає json з ключем {"message": "missing field favorite"} і статусом 400
 * @returns за результатом роботи функції повертає оновлений об'єкт контакту і статусом 200.
 * @returns в іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
 */
const updateStatusContact = async (req, res, next) => {
    const validContact = bodySchema.validate(req.body)

    if (validContact.error || !req.body.favorite) {
        return res.status(400).json({
            status: validContact.error.details,
            message: "missing field favorite",
        })
    }

    const contactId = req.params.contactId
    const body = req.body

    const updateStatusContact = await contactsModel.updateStatusContact(contactId, body)

    if (updateStatusContact) {
        return res.status(200).json({
            status: "success",
            code: 200,
            data: updateStatusContact,
        })
    } else {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }
}

module.exports = handleReqError(updateStatusContact) 
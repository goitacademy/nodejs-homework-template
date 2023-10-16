const contactsModel = require('../../models/contacts')
const { handleReqError } = require('../../helpers')
const { bodySchema } = require('../../models/validation/valid-contacts')

/**
 * POST /api/contacts
 * Отримує body в форматі {name, email, phone}
 * @returns якщо в body немає якихось полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
 * @returns якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту
 * @returns за результатом роботи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201
 */
const addContact = async (req, res, next) => {
    const validContact = bodySchema.validate(req.body)

    if (validContact.error) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: validContact.error.details[0].message,
        })
    }

    const contacts = await contactsModel.addContact(req.body)

    if (contacts) {
        return res.status(201).json({
            status: "success",
            code: 201,
            data: { contacts }
        })
    } else {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "missing required name field",
        })
    }
}

module.exports = handleReqError(addContact)
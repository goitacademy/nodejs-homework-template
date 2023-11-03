const contactsModel = require('../../models/contacts')
const { handleReqError } = require('../../helpers')

/**
 * GET /api/contacts/:id
 * Отримує параметр id
 * @returns якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
 * @returns якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
 */
const getContactById = async (req, res, next) => {
    const contactId = req.params.contactId

    const contact = await contactsModel.getContactById(contactId)

    if (contact) {
        return res.json({
            status: "success",
            code: 200,
            data: { contact },
        })
    } else {
        return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
        })
    }
}

module.exports = handleReqError(getContactById) 
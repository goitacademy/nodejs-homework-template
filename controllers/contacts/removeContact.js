const contactsModel = require('../../models/contacts')
const { handleReqError } = require('../../helpers')

/**
 * DELETE /api/contacts/:id
 * Отримує параметр id
 * @returns якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
 * @returns якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
 */
const removeContact = async (req, res, next) => {
    const contactId = req.params.contactId
    // const contact = await contactsModel.removeContact(contactId)
    const { contact, user } = await contactsModel.removeContact(contactId)

    if (contact) {
        return res.status(200).json({
            status: "success",
            code: 200,
            data: { message: "contact deleted" }
        })
    } else if (user) {
        return res.status(200).json({
            status: "success",
            code: 200,
            data: { message: "user deleted" }
        })
    } else {
        return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found"
        })
    }
}

module.exports = handleReqError(removeContact) 
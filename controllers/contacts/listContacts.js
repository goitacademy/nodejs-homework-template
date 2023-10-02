const contactsModel = require('../../models/contacts')
const { handleReqErr } = require('../../helpers')

/**
 * GET /api/contacts
 * @returns повертає масив всіх контактів в json-форматі зі статусом 200
 */
const listContacts = async (req, res, next) => {
    const contacts = await contactsModel.listContacts()
    return res.json({
        status: "success",
        code: 200,
        data: { contacts },
    })
}

module.exports = { listContacts: handleReqErr(listContacts) }
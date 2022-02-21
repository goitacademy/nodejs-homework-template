const contactsOperations = require('../../models/contacts/operations')

const removeContact = async (req, res, next) => {
    const { id } = req.params
    const result = await contactsOperations.removeContact(id)

    if (!result) {
        return res
            .status(404)
            .json({
                status: 'error',
                code: 404,
                message: 'Not Found'
            })
    }

    res.json({
        status: "success",
        code: 200,
        message: 'contact deleted'
    })
}

module.exports = removeContact
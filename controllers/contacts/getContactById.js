const contactsOperations = require('../../models/contacts/operations')

const getContactById = async (req, res, next) => {
    const { id } = req.params
    const result = await contactsOperations.getContactById(id)

    if (!result) {
        return res
            .status(404)
            .json({ status: 'error', code: 404, message: 'Not Found' })

    }

    res.json({
        status: "success",
        code: 200,
        payload: result
    })
}

module.exports = getContactById
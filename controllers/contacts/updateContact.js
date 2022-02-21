const contactsOperations = require('../../models/contacts/operations')

const updateContact = async (req, res, next) => {
    const { id } = req.params
    console.log(req.body)
    if (!req.body) { console.log('oops') }
    const result = await contactsOperations.updateContact(id, req.body)

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
        payload: result
    })
}

module.exports = updateContact
const contactsOperations = require("../../models/contacts");
const createError = require('http-errors');

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const result = await contactsOperations.removeContact(id);
        if (!result) {
            throw createError(404, `Contact with id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            message: 'contact deleted',
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};

module.exports = deleteById;
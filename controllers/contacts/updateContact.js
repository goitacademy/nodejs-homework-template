const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");


const updateContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsOperations.updateContact(id, req.body);
        if (!result) {
            throw createError(404, "Not found");
        }
        res.status(200).json(
            result
        );
    } catch (error) {
        next(error);
    }
}

module.exports = updateContact;
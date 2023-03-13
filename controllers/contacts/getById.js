const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsOperations.getById(id);

        if (!result) {
            throw createError(404, "Not found");
        }
        res.status(200).json({
            data: {
                result: result
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = getById;
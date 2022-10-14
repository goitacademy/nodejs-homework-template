const contactOperation = require("../../models/contacts");
const createError = require("http-errors");

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactOperation.removeContact(id);
        if (!result) {
            throw createError(404, `Contact with ID: ${id} not found`);
        }
        res.json({
            status: "success",
            code: 200,
            message: "contact deleted",
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteContact;
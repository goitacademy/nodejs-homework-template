const contactOperation = require("../../models/contacts");
const { schema } = require("../../schemas/contacts");
const createError = require("http-errors");


const updateById = async (req, res, next) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            error.message = "missing field";
            throw error;
        }
        const { id } = req.params;
        const result = await contactOperation.updateContact(id, req.body);
        if (!result) {
            throw createError(404, `Contact with ID: ${id} not found`);
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateById;
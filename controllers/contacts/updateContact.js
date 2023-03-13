const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");
const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})

const updateContact = async (req, res, next) => {
    try {
        const {error} = schema.validate(req.body);
        if (error) {
            throw createError(400, "missing fields");
        }
        const {id} = req.params;
        const result = await contactsOperations.updateContact(id, req.body);
        if (!result) {
            throw createError(404, "Not found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = updateContact;
const createError = require('http-errors');
const { Contact } = require('../../models/contact');
const { schemas } = require('../../schemas/schemas');

const update = async (req, res, next) => {
    try {
        const { error } = schemas.addSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });
        if (!result) {
            throw createError(404, `Contact with id=${contactId} not found`);
        }
        res.json({
            status: 'success',
            code: 201,
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = update;
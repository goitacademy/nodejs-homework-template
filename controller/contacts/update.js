const createError = require('http-errors');
const contactsOperations = require('../../models/contacts');
const contactShema = require('../../schema/schema');

const update = async (req, res, next) => {
    try {
        const { error } = contactShema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const result = await contactsOperations.updateById(contactId, req.body);
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
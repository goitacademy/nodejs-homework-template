const { Contact } = require('../../schema');
const { errorHandler } = require('../../helpers');
const { schemaJoiContact } = require('../../schema');

const { addSchema } = schemaJoiContact;

async function putContact(req, res, next) {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw errorHandler(400, error.message);
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });
        if (!result) {
            throw errorHandler(404, 'Not found');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { putContact };
